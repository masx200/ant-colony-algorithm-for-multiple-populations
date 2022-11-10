import { sum } from "lodash-es";

import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "../src/Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
import { get_distance_round } from "../src/set_distance_round";
import { assert_true } from "../test/assert_true";
import { DataOfFinishGreedyIteration } from "./DataOfFinishGreedyIteration";
import { getBestRoute_Of_Series_routes_and_lengths } from "./getBestRoute_Of_Series_routes_and_lengths";
import { greedy_first_search_routes_parallel } from "./greedy_first_search_routes_parallel";
import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";
import { SharedOptions } from "./SharedOptions";

export async function GreedyRoutesGenerator(
    options: {
        emit_finish_greedy_iteration: (
            data: DataOfFinishGreedyIteration
        ) => void;
        getBestRoute: () => number[];
        getBestLength: () => number;

        onRouteCreated: (route: number[], length: number) => void;
        emit_finish_one_route: (data: PureDataOfFinishOneRoute) => void;

        count_of_nodes: number;
    } & SharedOptions
): Promise<{
    best_length: number;
    best_route: number[];
    average_length: number;
}> {
    const {
        set_global_best,
        count_of_nodes,
        emit_finish_greedy_iteration,
        getBestRoute,
        getBestLength,

        onRouteCreated,
        emit_finish_one_route,
    } = options;

    const greedy_results_iter = greedy_first_search_routes_parallel({
        ...options,
        round: get_distance_round(),
    });
    const parallel_results: {
        length: number;
        route: number[];
        time_ms: number;
    }[] = [];

    for await (const { route, length, time_ms } of greedy_results_iter) {
        parallel_results.push({
            route,
            length,
            time_ms,
        });

        const oldLength = length;
        const oldRoute = route;

        if (oldLength < getBestLength()) {
            set_global_best(oldRoute, oldLength);
        }

        onRouteCreated(route, length);

        emit_finish_one_route({
            time_ms_of_one_route: time_ms,

            current_route_length: length,
        });
    }

    const { length: best_length, route: optimal_route_of_iteration } =
        getBestRoute_Of_Series_routes_and_lengths(parallel_results);
    const best_route = optimal_route_of_iteration;
    Greedy_algorithm_to_solve_tsp_with_selected_start_pool.destroy();
    const time_ms_of_one_iteration = sum(
        parallel_results.map((r) => r.time_ms)
    );
    const average_length_of_iteration =
        sum(parallel_results.map((a) => a.length)) / parallel_results.length;
    const worst_length_of_iteration = Math.max(
        ...parallel_results.map((a) => a.length)
    );
    emit_finish_greedy_iteration({
        worst_length_of_iteration,
        average_length_of_iteration,
        current_iterations: 1,
        optimal_length_of_iteration: best_length,
        optimal_route_of_iteration,
        time_ms_of_one_iteration,
        global_best_length: getBestLength(),
    });
    assert_true(getBestLength() < Infinity);
    assert_true(getBestRoute().length === count_of_nodes);
    return {
        best_length,
        best_route,
        average_length: average_length_of_iteration,
    };
}
