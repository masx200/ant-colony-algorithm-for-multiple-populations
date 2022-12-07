import { generateUniqueArrayOfCircularPath } from "../functions/generateUniqueArrayOfCircularPath";
import { DefaultOptions } from "../src/default_Options";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { TSP_Worker_Remote } from "../src/TSP_Worker_Remote";
import {
    COMMON_DataOfOneIteration,
    COMMON_DataOfOneRoute,
    COMMON_TSP_Output,
} from "./tsp-interface";
import { similarityOfMultipleRoutes } from "../similarity/similarityOfMultipleRoutes";
import { extractCommonRoute } from "../common/extractCommonRoute";
import { MultiPopulationScheduler } from "./MultiPopulationScheduler";
import { zip } from "lodash-es";
import { MultiPopulationOutput } from "./MultiPopulationOutput";
import { ProbabilityOfPerformingTheFirstCommunication } from "./ProbabilityOfPerformingTheFirstCommunication";
import { initializeRemoteWorkers } from "./initializeRemoteWorkers";
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
    const HistoryOfTheWayPopulationsCommunicate: string[] = [];
    const HistoryOfPopulationsAllUpdateBestRoute: boolean[] = [];
    const remoteWorkers: WorkerRemoteAndInfo[] = await initializeRemoteWorkers(
        number_of_populations_of_the_first_category,
        options,
        number_of_the_second_type_of_population
    );

    let current_iterations = 0;
    async function runIterations(iterations: number) {
        if (iterations === 1) return await runOneIteration();
        const splitted_iterations: number[] = [];

        const rest_iterations_period =
            current_iterations %
                (population_communication_iterate_cycle *
                    remoteWorkers.length) ===
            0
                ? 0
                : Math.floor(
                      (population_communication_iterate_cycle *
                          remoteWorkers.length -
                          (current_iterations %
                              (population_communication_iterate_cycle *
                                  remoteWorkers.length))) /
                          remoteWorkers.length
                  );
        if (rest_iterations_period > 0) {
            splitted_iterations.push(
                Math.min(rest_iterations_period, iterations)
            );

            iterations -= Math.min(rest_iterations_period, iterations);
        }
        while (iterations > population_communication_iterate_cycle) {
            iterations -= population_communication_iterate_cycle;
            splitted_iterations.push(population_communication_iterate_cycle);
        }
        if (iterations > 0) splitted_iterations.push(iterations);

        for (const iteration of splitted_iterations) {
            await Promise.all(
                remoteWorkers.map((remote) => {
                    return remote.runIterations(iteration);
                })
            );

            const routesAndLengths = await Promise.all(
                remoteWorkers.map(async (remote) => {
                    return {
                        length: await remote.getBestLength(),
                        route: await remote.getBestRoute(),
                    };
                })
            );
            const totaltimemsall = await Promise.all(
                remoteWorkers.map((remote) => remote.getTotalTimeMs())
            );
            const current_search_countsall = await Promise.all(
                remoteWorkers.map((remote) => remote.getCurrentSearchCount())
            );
            const latestIterateBestRoutesInPeriod = (
                await Promise.all(
                    remoteWorkers.map((remote) =>
                        remote.getLatestIterateBestRoutesInPeriod(
                            population_communication_iterate_cycle
                        )
                    )
                )
            ).flat();
            routesAndLengths.forEach(({ route, length }) => {
                onRouteCreated(route, length);
            });

            total_time_ms = totaltimemsall.reduce((p, c) => p + c, 0);

            current_search_count = current_search_countsall.reduce(
                (p, c) => p + c,
                0
            );
            current_iterations += remoteWorkers.length * iteration;
            await DetermineWhetherToPerformMultiPopulationCommunication(
                routesAndLengths,
                latestIterateBestRoutesInPeriod
            );
        }
    }
    const global_best: {
        length: number;
        route: number[];
    } = { length: Infinity, route: [] };

    async function DetermineWhetherToPerformMultiPopulationCommunication(
        routesAndLengths: { length: number; route: number[] }[],
        latestIterateBestRoutesInPeriod: number[][]
    ) {
        if (
            current_iterations %
                (population_communication_iterate_cycle *
                    remoteWorkers.length) ===
            0
        ) {
            await PerformCommunicationBetweenPopulations(
                routesAndLengths,
                latestIterateBestRoutesInPeriod
            );
            const PeriodOfUpdateAllOptimalRoutes = 8;
            if (
                current_iterations %
                    (population_communication_iterate_cycle *
                        remoteWorkers.length *
                        PeriodOfUpdateAllOptimalRoutes) ===
                0
            ) {
                HistoryOfPopulationsAllUpdateBestRoute.push(true);
                await Promise.all(
                    remoteWorkers.map((remote) =>
                        remote.updateBestRoute(getBestRoute(), getBestLength())
                    )
                );
            } else {
                HistoryOfPopulationsAllUpdateBestRoute.push(false);
            }
        }
    }

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
            remoteWorkers.map((remote) => {
                return remote.runOneIteration();
            })
        );

        const routesAndLengths = await Promise.all(
            remoteWorkers.map(async (remote) => {
                return {
                    length: await remote.getBestLength(),
                    route: await remote.getBestRoute(),
                };
            })
        );
        const totaltimemsall = await Promise.all(
            remoteWorkers.map((remote) => remote.getTotalTimeMs())
        );
        const current_search_countsall = await Promise.all(
            remoteWorkers.map((remote) => remote.getCurrentSearchCount())
        );
        const latestIterateBestRoutesInPeriod = (
            await Promise.all(
                remoteWorkers.map((remote) =>
                    remote.getLatestIterateBestRoutesInPeriod(
                        population_communication_iterate_cycle
                    )
                )
            )
        ).flat();
        routesAndLengths.forEach(({ route, length }) => {
            onRouteCreated(route, length);
        });

        total_time_ms = totaltimemsall.reduce((p, c) => p + c, 0);

        current_search_count = current_search_countsall.reduce(
            (p, c) => p + c,
            0
        );
        current_iterations += remoteWorkers.length;

        await DetermineWhetherToPerformMultiPopulationCommunication(
            routesAndLengths,
            latestIterateBestRoutesInPeriod
        );
    }
    let time_of_best_ms = 0;
    let current_search_count = 0;
    let search_count_of_best = 0;

    let best_length_of_history_route_data = Infinity;
    async function getOutputDataAndConsumeIterationAndRouteData(): Promise<MultiPopulationOutput> {
        const dataOfChildren = await Promise.all(
            remoteWorkers.map((remote) =>
                remote.getOutputDataAndConsumeIterationAndRouteData()
            )
        );
        const RouteDataOfIndividualPopulations = dataOfChildren.map(
            (data) => data.data_of_routes
        );
        const data_of_routes: COMMON_TSP_Output["data_of_routes"] = (
            zip(...RouteDataOfIndividualPopulations)
                .flat()
                .filter(Boolean) as COMMON_DataOfOneRoute[]
        ).map((data) => {
            best_length_of_history_route_data = Math.min(
                data.global_best_length,
                best_length_of_history_route_data
            );
            data.global_best_length = best_length_of_history_route_data;
            return data;
        });
        const IterationDataOfIndividualPopulations = dataOfChildren.map(
            (data, index) =>
                data.delta_data_of_iterations.map((di) => {
                    di.ClassOfPopulation =
                        remoteWorkers[index].ClassOfPopulation;
                    di.id_Of_Population = remoteWorkers[index].id_Of_Population;
                    return di;
                })
        );
        const delta_data_of_iterations: COMMON_TSP_Output["delta_data_of_iterations"] =
            zip(...IterationDataOfIndividualPopulations)
                .flat()
                .filter(Boolean) as COMMON_DataOfOneIteration[];

        const result: MultiPopulationOutput = {
            HistoryOfPopulationsAllUpdateBestRoute,
            HistoryOfTheWayPopulationsCommunicate,
            similarityOfAllPopulationsHistory,
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
            IterationDataOfIndividualPopulations,
            RouteDataOfIndividualPopulations,
        };

        return result;
    }
    const similarityOfAllPopulationsHistory: number[] = [];

    const { count_of_ants } = options;
    async function PerformCommunicationBetweenPopulations(
        routesAndLengths: {
            length: number;
            route: number[];
        }[],
        latestIterateBestRoutesInPeriod: number[][]
    ): Promise<void> {
        const lengths = routesAndLengths.map((a) => a.length);
        const bestRoute = getBestRoute();
        const similarityOfAllPopulations = similarityOfMultipleRoutes(
            latestIterateBestRoutesInPeriod,
            bestRoute
        );
        similarityOfAllPopulationsHistory.push(similarityOfAllPopulations);
        const similarity = similarityOfAllPopulations;
        const probabilityOfPerformingTheFirstCommunication =
            ProbabilityOfPerformingTheFirstCommunication(similarity);
        const p0 = Math.random();
        if (
            p0 < probabilityOfPerformingTheFirstCommunication &&
            current_search_count - search_count_of_best >
                2 *
                    population_communication_iterate_cycle *
                    remoteWorkers.length *
                    count_of_ants
        ) {
            HistoryOfTheWayPopulationsCommunicate.push("增加多样性");
            const randomHalf = remoteWorkers
                .map((w, i) => ({
                    remote: w,
                    length: lengths[i],
                }))
                .sort(() => Math.random() - 0.5)
                .slice(Math.floor(remoteWorkers.length / 2));
            await Promise.all(
                randomHalf.map(({ remote }) =>
                    remote.smoothPheromones(similarityOfAllPopulations)
                )
            );
        } else if (p0 > probabilityOfPerformingTheFirstCommunication) {
            HistoryOfTheWayPopulationsCommunicate.push("提高收敛速度");
            const backHalf = remoteWorkers
                .map((w, i) => ({
                    remote: w,
                    length: lengths[i],
                }))
                .sort((a, b) => a.length - b.length)
                .slice(Math.floor(remoteWorkers.length / 2));
            const routes = (
                await Promise.all(
                    remoteWorkers.map((remote) =>
                        remote.getCollectionOfBetterRoutes()
                    )
                )
            ).flat();
            const commonRoute = extractCommonRoute(routes);

            await Promise.all(
                backHalf
                    .map(({ remote }) => remote)
                    .map((remote) =>
                        remote.updateBestRoute(getBestRoute(), getBestLength())
                    )
            );

            await Promise.all(
                backHalf.map(({ remote }) =>
                    remote.rewardCommonRoutes(commonRoute)
                )
            );
        } else {
            HistoryOfTheWayPopulationsCommunicate.push("减少最优和最差的差距");

            const sorted = remoteWorkers
                .map((w, i) => ({
                    remote: w,
                    length: lengths[i],
                }))
                .sort((a, b) => a.length - b.length);
            const first = sorted[0];
            const last = sorted[sorted.length - 1];
            if (first.length !== last.length) {
                const routes = await first.remote.getCollectionOfBetterRoutes();
                const commonRoute = extractCommonRoute(routes);

                await last.remote.rewardCommonRoutes(commonRoute);
            }
        }
    }

    return {
        getCountOfIterations(): number {
            return current_iterations;
        },
        getCurrentSearchCount(): number {
            return current_search_count;
        },
        getTotalTimeMs(): number {
            return total_time_ms;
        },
        runIterations,
        runOneIteration,
        getBestLength: getBestLength,
        getBestRoute: getBestRoute,
        getOutputDataAndConsumeIterationAndRouteData,
        getSearchCountOfBest(): number {
            return search_count_of_best;
        },
        getTimeOfBest(): number {
            return time_of_best_ms;
        },
    };
}
