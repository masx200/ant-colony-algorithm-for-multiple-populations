import {
    COMMON_DataOfOneIteration,
    COMMON_DataOfOneRoute,
    COMMON_TSP_EXECUTION,
    COMMON_TSP_Options,
    COMMON_TSP_Output,
} from "./tsp-interface";
import { generateUniqueArrayOfCircularPath } from "../functions/generateUniqueArrayOfCircularPath";
import { MatrixSymmetryCreate, MatrixFill } from "@masx200/sparse-2d-matrix";
import { run_greedy_once_thread_with_time } from "../functions/run_greedy_once_thread_with_time";
import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "../src/Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
import { calc_population_relative_information_entropy } from "../functions/calc_population-relative-information-entropy";
import { sum, uniq } from "lodash-es";
import { cycle_route_to_segments } from "../functions/cycle_route_to_segments";
import { closed_total_path_length } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { get_distance_round } from "../src/set_distance_round";
import { assert_true } from "../test/assert_true";

import { pickRandomOne } from "../functions/pickRandomOne";
import { geteuclideandistancebyindex } from "../functions/geteuclideandistancebyindex";
import { calc_state_transition_probabilities } from "../functions/calc_state_transition_probabilities";
import { DefaultOptions } from "../src/default_Options";
import { create_collection_of_optimal_routes } from "../collections/collection-of-optimal-routes";
import { select_available_cities_from_optimal_and_latest } from "../functions/select_available_cities_from_optimal_and_latest";
import { run_local_optimization } from "./run_local_optimization";
import { create_run_iterations } from "../functions/create_run_iterations";
import { similarityOfMultipleRoutes } from "../similarity/similarityOfMultipleRoutes";
import { DataOfFinishGreedyIteration } from "../functions/DataOfFinishGreedyIteration";
import { createLatestIterateBestRoutesInPeriod } from "./createLatestIterateBestRoutesInPeriod";
import { createSmoothPheromones } from "./createSmoothPheromones";
import { createRewardCommonRoutes } from "./createRewardCommonRoutes";

export function tsp_similarity_execution_and_local_optimization_with_Optional_city_rewards_and_punishments(
    input: COMMON_TSP_Options
): COMMON_TSP_EXECUTION {
    const options = Object.assign(structuredClone(DefaultOptions), input);
    const {
        max_cities_of_state_transition = DefaultOptions.max_cities_of_state_transition,
        max_size_of_collection_of_optimal_routes = DefaultOptions.max_size_of_collection_of_optimal_routes,
        max_results_of_2_opt = DefaultOptions.max_results_of_2_opt,
        max_segments_of_cross_point = DefaultOptions.max_segments_of_cross_point,
        max_results_of_k_opt = DefaultOptions.max_results_of_k_opt,
        max_results_of_k_exchange = DefaultOptions.max_results_of_k_exchange,
        count_of_ants = DefaultOptions.count_of_ants,
        node_coordinates,
        distance_round = true,
        local_pheromone_volatilization_coefficient = DefaultOptions.local_pheromone_volatilization_coefficient,
        global_pheromone_volatilization_coefficient = DefaultOptions.global_pheromone_volatilization_coefficient,
        beta_zero = DefaultOptions.beta_for_the_second_type_of_population,
        alpha_zero = DefaultOptions.alpha_for_the_second_type_of_population,
        path_selection_parameter_q0_max = DefaultOptions.path_selection_parameter_q0_max,
        path_selection_parameter_q0_min = DefaultOptions.path_selection_parameter_q0_min,
    } = options;

    let Intra_population_similarity = 0;
    const data_of_greedy: DataOfFinishGreedyIteration[] = [];
    let route_selection_parameters_Q0 = path_selection_parameter_q0_min;
    const collection_of_optimal_routes = create_collection_of_optimal_routes(
        max_size_of_collection_of_optimal_routes
    );
    const global_optimal_routes = collection_of_optimal_routes;
    const neighbors_from_optimal_routes_and_latest_routes = new Map<
        number,
        number[]
    >();
    const latest_and_optimal_routes = collection_of_optimal_routes;
    function update_neighbors_from_optimal_routes() {
        const cache = neighbors_from_optimal_routes_and_latest_routes;
        cache.clear();
        for (const city of node_coordinates.keys()) {
            const result = uniq(
                latest_and_optimal_routes
                    .map(({ route }) => {
                        const index = route.findIndex((v) => v === city);

                        if (index < 0) {
                            throw Error("Incorrect_route_found of city");
                        }

                        return [
                            route.at((index - 1 + route.length) % route.length),
                            route.at((index + 1 + route.length) % route.length),
                        ].filter((n) => typeof n === "number") as number[];
                    })
                    .flat()
            );
            cache.set(city, result);
        }
    }
    const count_of_nodes = node_coordinates.length;
    const pheromoneStore = MatrixSymmetryCreate({ row: count_of_nodes });
    let pheromoneZero = Number.EPSILON;
    let greedy_length = Infinity;
    let total_time_ms = 0;
    function getCountOfIterations() {
        return current_search_count / count_of_ants;
    }

    let current_search_count = 0;
    let time_of_best_ms = 0;
    function set_global_best(route: number[], length: number) {
        if (length < global_best.length) {
            const formatted_route = generateUniqueArrayOfCircularPath(route);

            global_best.length = length;
            global_best.route = formatted_route;
            time_of_best_ms = total_time_ms;
            search_count_of_best = current_search_count + 1;
        }
    }
    let search_count_of_best = 0;
    const global_best: {
        length: number;
        route: number[];
    } = { length: Infinity, route: [] };
    function get_best_route() {
        return global_best.route;
    }

    function get_best_length() {
        return global_best.length;
    }
    function onRouteCreated(route: number[], length: number) {
        if (length < get_best_length()) {
            set_global_best(route, length);
        }

        collection_of_optimal_routes.add(route, length);
    }
    const data_of_routes: COMMON_DataOfOneRoute[] = [];
    const delta_data_of_iterations: COMMON_DataOfOneIteration[] = [];
    const get_neighbors_from_optimal_routes_and_latest_routes = function (
        current_city: number
    ): number[] {
        return (
            neighbors_from_optimal_routes_and_latest_routes.get(current_city) ||
            []
        );
    };
    const is_count_not_large = count_of_nodes <= max_cities_of_state_transition;
    const get_filtered_nodes = function (
        current_city: number,
        available_nodes: Set<number>
    ): number[] | Set<number> {
        return is_count_not_large
            ? available_nodes
            : select_available_cities_from_optimal_and_latest({
                  available_nodes,
                  get_neighbors_from_optimal_routes_and_latest_routes:
                      get_neighbors_from_optimal_routes_and_latest_routes,
                  current_city,
                  max_cities_of_state_transition:
                      max_cities_of_state_transition,
              });
    };
    function generate_paths_using_state_transition_probabilities(): {
        route: number[];
        length: number;
        time_ms: number;
    } {
        const starttime_of_one_route = Number(new Date());

        const inputindexs = Array(node_coordinates.length)
            .fill(0)
            .map((_v, i) => i);
        const startnode = pickRandomOne(inputindexs);
        const route: number[] = [startnode];
        const available_nodes = new Set<number>(
            inputindexs.filter((v) => !route.includes(v))
        );
        const getpheromone = (left: number, right: number) => {
            return pheromoneStore.get(left, right);
        };
        const getdistancebyserialnumber = (left: number, right: number) => {
            return geteuclideandistancebyindex(
                left,
                right,
                node_coordinates,
                get_distance_round()
            );
        };

        while (route.length !== count_of_nodes) {
            const current_city = Array.from(route).slice(-1)[0];

            const nextnode = picknextnode({
                alpha_zero,
                beta_zero,

                currentnode: current_city,
                availablenextnodes: Array.from(
                    get_filtered_nodes(current_city, available_nodes)
                ),
                getpheromone,
                getdistancebyserialnumber,
            });
            route.push(nextnode);
            available_nodes.delete(nextnode);
        }

        local_pheromone_update(route);
        const routelength = closed_total_path_length({
            round: get_distance_round(),
            path: route,
            getdistancebyindex: creategetdistancebyindex(
                node_coordinates,
                get_distance_round()
            ),
        });
        const length = routelength;
        assert_true(route.length == count_of_nodes);
        const endtime_of_one_route = Number(new Date());
        const time_ms = endtime_of_one_route - starttime_of_one_route;
        return { time_ms, route, length };
    }
    function local_pheromone_update(route: number[]) {
        for (const [city1, city2] of cycle_route_to_segments(route)) {
            const changed_pheromone =
                (1 - local_pheromone_volatilization_coefficient) *
                    pheromoneStore.get(city1, city2) +
                local_pheromone_volatilization_coefficient * pheromoneZero;
            pheromoneStore.set(city1, city2, changed_pheromone);
        }
    }
    function global_pheromone_update(iterate_best_length: number) {
        const best_route = get_best_route();
        const best_length = get_best_length();

        const delta_pheromone = 1 / best_length;
        for (const [city1, city2] of cycle_route_to_segments(best_route)) {
            const changed_pheromone =
                (1 - global_pheromone_volatilization_coefficient) *
                    pheromoneStore.get(city1, city2) +
                global_pheromone_volatilization_coefficient * delta_pheromone +
                Intra_population_similarity * (1 / iterate_best_length);
            pheromoneStore.set(city1, city2, changed_pheromone);
        }
    }
    async function runOneIteration() {
        let time_ms_of_one_iteration = 0;
        if (current_search_count === 0) {
            const {
                length: best_length,
                route: best_route,
                time_ms,
            } = await run_greedy_once_thread_with_time({
                node_coordinates,
                round: distance_round,
            });
            Greedy_algorithm_to_solve_tsp_with_selected_start_pool.destroy();
            set_global_best(best_route, best_length);

            time_ms_of_one_iteration += time_ms;
            greedy_length = best_length;
            pheromoneZero = 1 / count_of_nodes / greedy_length;
            MatrixFill(pheromoneStore, pheromoneZero);
            data_of_greedy.push({
                current_iterations: 1,
                time_ms_of_one_iteration: time_ms,
                worst_length_of_iteration: best_length,
                global_best_length: best_length,
                optimal_length_of_iteration: best_length,
                optimal_route_of_iteration: best_route,
                average_length_of_iteration: best_length,
            });
        }
        if (!is_count_not_large) {
            update_neighbors_from_optimal_routes();
        }
        const routes_and_lengths_of_one_iteration: {
            route: number[];
            length: number;
            time_ms: number;
        }[] = Array.from({ length: count_of_ants }).map(() => {
            return generate_paths_using_state_transition_probabilities();
        });
        onUpdateIterateBestRoutesInPeriod(routes_and_lengths_of_one_iteration);
        for (const {
            route,
            length,
            time_ms: time_ms_of_one_route,
        } of routes_and_lengths_of_one_iteration) {
            onRouteCreated(route, length);

            time_ms_of_one_iteration += time_ms_of_one_route;
            current_search_count++;
            data_of_routes.push({
                global_best_length: get_best_length(),
                current_route_length: length,
                current_search_count,
                time_ms_of_one_route,
            });
        }
        if (routes_and_lengths_of_one_iteration.length === count_of_ants) {
            const {
                time_ms: optimal_time_ms,
                length: optimal_length_of_iteration,
                route: optimal_route_of_iteration,
            } = await run_local_optimization(
                routes_and_lengths_of_one_iteration,
                get_best_route,
                get_best_length,
                count_of_nodes,
                max_segments_of_cross_point,
                distance_round,
                max_results_of_k_opt,
                node_coordinates,
                max_results_of_k_exchange,
                max_results_of_2_opt
            );
            onRouteCreated(
                optimal_route_of_iteration,
                optimal_length_of_iteration
            );

            const starttime_of_process_iteration = Number(new Date());

            const current_routes = routes_and_lengths_of_one_iteration.map(
                (a) => a.route
            );
            const iterate_best_length = Math.min(
                ...routes_and_lengths_of_one_iteration.map((a) => a.length)
            );
            global_pheromone_update(iterate_best_length);
            const population_relative_information_entropy =
                calc_population_relative_information_entropy(current_routes);
            const average_length_of_iteration =
                sum(routes_and_lengths_of_one_iteration.map((a) => a.length)) /
                routes_and_lengths_of_one_iteration.length;
            const worst_length_of_iteration = Math.max(
                ...routes_and_lengths_of_one_iteration.map((a) => a.length)
            );

            Intra_population_similarity = similarityOfMultipleRoutes(
                current_routes,
                get_best_route()
            );
            route_selection_parameters_Q0 =
                path_selection_parameter_q0_min +
                (path_selection_parameter_q0_max -
                    path_selection_parameter_q0_min) *
                    Math.pow(1 - Intra_population_similarity, 3);
            if (Intra_population_similarity > 0.85) {
                createSmoothPheromones(
                    // pheromone_volatilization_coefficient_of_smooth,
                    pheromoneStore,
                    global_optimal_routes
                )(Intra_population_similarity);
            }
            const endtime_of_process_iteration = Number(new Date());

            time_ms_of_one_iteration +=
                optimal_time_ms +
                endtime_of_process_iteration -
                starttime_of_process_iteration;
            total_time_ms += time_ms_of_one_iteration;
            delta_data_of_iterations.push({
                global_best_length: get_best_length(),
                current_iterations: getCountOfIterations(),
                time_ms_of_one_iteration,
                population_relative_information_entropy,
                average_length_of_iteration,
                worst_length_of_iteration,
                iterate_best_length,
                Intra_population_similarity,
                optimal_length_of_iteration,
                convergence_coefficient: -Infinity,
                random_selection_probability: -Infinity,
            });
        }
    }
    // const { pheromone_volatilization_coefficient_of_smooth } = options;
    function picknextnode({
        beta_zero,
        alpha_zero,
        currentnode,
        getpheromone,
        getdistancebyserialnumber,
        availablenextnodes,
    }: {
        alpha_zero: number;
        beta_zero: number;
        currentnode: number;
        availablenextnodes: number[];
        getpheromone: (left: number, right: number) => number;
        getdistancebyserialnumber: (left: number, right: number) => number;
    }): number {
        const beta = beta_zero;
        const alpha = alpha_zero;
        const random = Math.random();
        if (random < route_selection_parameters_Q0) {
            const nextnode_and_weights = availablenextnodes.map((nextnode) => {
                const weight = calc_state_transition_probabilities({
                    getpheromone,

                    nextnode,
                    currentnode,
                    alpha,
                    getdistancebyserialnumber,
                    beta,
                });
                return { nextnode, weight };
            });

            return nextnode_and_weights.reduce((c, v) => {
                return c.weight > v.weight ? c : v;
            }, nextnode_and_weights[0]).nextnode;
        }

        const result = pickRandomOne(
            availablenextnodes,
            availablenextnodes.map((nextnode) => {
                const weight = calc_state_transition_probabilities({
                    getpheromone,

                    nextnode,
                    currentnode,
                    alpha,
                    getdistancebyserialnumber,
                    beta,
                });

                return weight;
            })
        );
        return result;
    }

    async function getOutputDataAndConsumeIterationAndRouteData(): Promise<COMMON_TSP_Output> {
        const output: COMMON_TSP_Output = {
            data_of_routes: Array.from(data_of_routes),
            delta_data_of_iterations: Array.from(delta_data_of_iterations),
            time_of_best_ms,
            total_time_ms,
            search_count_of_best,
            data_of_greedy,
            global_best_length: get_best_length(),
            current_search_count,
            current_iterations: getCountOfIterations(),
            global_best_route: get_best_route(),
        };
        delta_data_of_iterations.length = 0;
        data_of_routes.length = 0;
        return output;
    }
    const runIterations = create_run_iterations(runOneIteration);

    const { pheromone_volatilization_coefficient_of_communication } = options;

    const {
        getLatestIterateBestRoutesInPeriod,
        onUpdateIterateBestRoutesInPeriod,
    } = createLatestIterateBestRoutesInPeriod();
    const smoothPheromones = createSmoothPheromones(
        // pheromone_volatilization_coefficient_of_communication,
        pheromoneStore,
        global_optimal_routes
    );
    const rewardCommonRoutes = createRewardCommonRoutes(
        pheromone_volatilization_coefficient_of_communication,
        pheromoneStore,
        count_of_nodes
    );
    return {
        getLatestIterateBestRoutesInPeriod,
        getCountOfIterations,
        getCurrentSearchCount() {
            return current_search_count;
        },
        getTotalTimeMs() {
            return total_time_ms;
        },
        updateBestRoute(route, length) {
            onRouteCreated(route, length);
        },
        smoothPheromones,
        rewardCommonRoutes,
        getBestRoute() {
            return get_best_route();
        },
        getBestLength() {
            return get_best_length();
        },
        runIterations,
        runOneIteration: runOneIteration,
        getOutputDataAndConsumeIterationAndRouteData:
            getOutputDataAndConsumeIterationAndRouteData,
        getTimeOfBest() {
            return time_of_best_ms;
        },
        getSearchCountOfBest() {
            return search_count_of_best;
        },
    };
}
