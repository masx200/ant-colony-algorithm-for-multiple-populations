import { create_run_iterations } from "../functions/create_run_iterations";
import { generateUniqueArrayOfCircularPath } from "../functions/generateUniqueArrayOfCircularPath";
import { DefaultOptions } from "../src/default_Options";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { TSP_Worker_Remote } from "../src/TSP_Worker_Remote";
import { createWorkerRemoteAndInfo } from "./createWorkerRemoteAndInfo";
import { COMMON_TSP_Output } from "./tsp-interface";
export interface MultiPopulationScheduler {
    runOneIteration: () => Promise<void>;
    getOutputDataAndConsumeIterationData: () => COMMON_TSP_Output;
    runIterations: (iterations: number) => Promise<void>;
    getCurrentSearchCount(): number;
    getBestLength: () => number;
    getTotalTimeMs: () => number;
    getBestRoute: () => number[];
}
export type WorkerRemoteAndInfo = TSP_Worker_Remote["remote"] & {
    ClassOfPopulation: string;
    id_Of_Population: number;
};

export async function MultiPopulationScheduler(
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
        current_iterations += remoteworkers.length;

        const routesAndLengths = await Promise.all(
            remoteworkers.map(async (remote) => {
                return {
                    length: await remote.getBestLength(),
                    route: await remote.getBestRoute(),
                };
            })
        );
        routesAndLengths.forEach(({ route, length }) => {
            onRouteCreated(route, length);
        });
        const totaltimemsall = await Promise.all(
            remoteworkers.map((remote) => remote.getTotalTimeMs())
        );
        total_time_ms = totaltimemsall.reduce((p, c) => p + c, 0);
        const current_search_countsall = await Promise.all(
            remoteworkers.map((remote) => remote.getCurrentSearchCount())
        );
        current_search_count = current_search_countsall.reduce(
            (p, c) => p + c,
            0
        );
    }
    let current_search_count = 0;
    return {
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
        getOutputDataAndConsumeIterationData(): COMMON_TSP_Output {
            const result: COMMON_TSP_Output = {
                current_iterations,
                current_search_count,
                global_best_length: getBestLength(),
                global_best_route: getBestRoute(),
                total_time_ms,
            };
            return result;
        },
    };
}
