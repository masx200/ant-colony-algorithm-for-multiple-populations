import { create_run_iterations } from "../functions/create_run_iterations";
import { generateUniqueArrayOfCircularPath } from "../functions/generateUniqueArrayOfCircularPath";
import { DefaultOptions } from "../src/default_Options";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { TSP_Worker_Remote } from "../src/TSP_Worker_Remote";
import { CommonTspRunner } from "./CommonTspRunner";
import { createWorkerRemoteAndInfo } from "./createWorkerRemoteAndInfo";
import { COMMON_TSP_Output } from "./tsp-interface";
export type MultiPopulationScheduler = CommonTspRunner;
export type WorkerRemoteAndInfo = TSP_Worker_Remote["remote"] & {
    ClassOfPopulation: string;
    id_Of_Population: number;
};

export async function MultiPopulationSchedulerCreate(
    input: TSPRunnerOptions
): Promise<MultiPopulationScheduler> {
    const options = Object.assign(structuredClone(DefaultOptions), input);
    const {
        number_of_populations_of_the_first_category,

        number_of_the_second_type_of_population,

        population_communication_iterate_cycle,
    } = options;

    const remoteworkers: WorkerRemoteAndInfo[] = [];
    await createWorkerRemoteAndInfo(
        number_of_populations_of_the_first_category,
        options,
        remoteworkers,
        "动态信息素更新"
    );
    await createWorkerRemoteAndInfo(
        number_of_the_second_type_of_population,
        options,
        remoteworkers,
        "相似度的自适应"
    );

    let current_iterations = 0;
    const runIterations = create_run_iterations(runOneIteration);
    const global_best: {
        length: number;
        route: number[];
    } = { length: Infinity, route: [] };
    function getBestRoute() {
        return global_best.route;
    }
    function set_global_best(route: number[], length: number) {
        if (length < global_best.length) {
            const formatted_route = generateUniqueArrayOfCircularPath(route);

            global_best.length = length;
            global_best.route = formatted_route;
            time_of_best_ms = total_time_ms;
            search_count_of_best = current_search_count + 1;
        }
    }
    function onRouteCreated(route: number[], length: number) {
        if (length < getBestLength()) {
            set_global_best(route, length);
        }
    }

    function getBestLength() {
        return global_best.length;
    }
    let total_time_ms = 0;
    async function runOneIteration() {
        await Promise.all(
            remoteworkers.map((remote) => {
                return remote.runOneIteration();
            })
        );

        const routesAndLengths = await Promise.all(
            remoteworkers.map(async (remote) => {
                return {
                    length: await remote.getBestLength(),
                    route: await remote.getBestRoute(),
                };
            })
        );
        const totaltimemsall = await Promise.all(
            remoteworkers.map((remote) => remote.getTotalTimeMs())
        );
        const current_search_countsall = await Promise.all(
            remoteworkers.map((remote) => remote.getCurrentSearchCount())
        );
        routesAndLengths.forEach(({ route, length }) => {
            onRouteCreated(route, length);
        });

        total_time_ms = totaltimemsall.reduce((p, c) => p + c, 0);

        current_search_count = current_search_countsall.reduce(
            (p, c) => p + c,
            0
        );
        current_iterations += remoteworkers.length;
        if (current_iterations % population_communication_iterate_cycle === 0)
            PerformCommunicationBetweenPopulations();
    }
    let time_of_best_ms = 0;
    let current_search_count = 0;
    let search_count_of_best = 0;
    async function getOutputDataAndConsumeIterationAndRouteData(): Promise<COMMON_TSP_Output> {
        const dataOfChildren = await Promise.all(
            remoteworkers.map((remote) =>
                remote.getOutputDataAndConsumeIterationAndRouteData()
            )
        );
        const data_of_routes: COMMON_TSP_Output["data_of_routes"] =
            dataOfChildren.map((data) => data.data_of_routes).flat();
        const delta_data_of_iterations: COMMON_TSP_Output["delta_data_of_iterations"] =
            dataOfChildren
                .map((data, index) =>
                    data.delta_data_of_iterations.map((di) => {
                        di.ClassOfPopulation =
                            remoteworkers[index].ClassOfPopulation;
                        di.id_Of_Population =
                            remoteworkers[index].id_Of_Population;
                        return di;
                    })
                )
                .flat();
        const result: COMMON_TSP_Output = {
            data_of_greedy: dataOfChildren
                .map((data) => data.data_of_greedy)
                .flat(),
            current_iterations,
            data_of_routes,
            delta_data_of_iterations,
            current_search_count,
            global_best_length: getBestLength(),
            global_best_route: getBestRoute(),
            total_time_ms,
            time_of_best_ms,
            search_count_of_best,
        };
        return result;
    }
    function PerformCommunicationBetweenPopulations() {
        throw new Error("Function not implemented.");
    }
    return {
        getCountOfIterations() {
            return current_iterations;
        },
        getCurrentSearchCount() {
            return current_search_count;
        },
        getTotalTimeMs() {
            return total_time_ms;
        },
        async runIterations(iterations: number) {
            return runIterations(iterations);
        },
        runOneIteration,
        getBestLength: getBestLength,
        getBestRoute: getBestRoute,
        getOutputDataAndConsumeIterationAndRouteData,
        getSearchCountOfBest() {
            return search_count_of_best;
        },
        getTimeOfBest() {
            return time_of_best_ms;
        },
    };
}
