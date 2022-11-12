import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { TSP_Output_Data } from "../functions/TSP_Output_Data";
import { RunnerMultipleCommunicative } from "../src/RunnerMultipleCommunicative";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
export type COMMON_TSP_EXECUTION = {
    runOneIteration: () => Promise<void>;
    getOutputDataAndConsumeIterationAndRouteData: () => COMMON_TSP_Output;
} & RunnerMultipleCommunicative;
export type COMMON_TSP_Output = {
    total_time_ms: number;
    current_iterations: number;
    current_search_count: number;
    data_of_routes: COMMON_DataOfOneRoute[];
    delta_data_of_iterations: COMMON_DataOfOneIteration[];
    time_of_best_ms: number;
    global_best_route: number[];
    global_best_length: number;
    search_count_of_best: number;
} & TSP_Output_Data;
export type COMMON_DataOfOneRoute = {
    global_best_length: number;

    current_search_count: number;
    time_ms_of_one_route: number;

    current_route_length: number;
} & DataOfFinishOneRoute;
export type COMMON_DataOfOneIteration = {
    current_iterations: number;
    global_best_length: number;
    iterate_best_length: number;
    population_relative_information_entropy: number;
    average_length_of_iteration: number;
    worst_length_of_iteration: number;
    time_ms_of_one_iteration: number;
} & DataOfFinishOneIteration;
export type COMMON_TSP_Options = {
    distance_round?: boolean;
    alpha_zero?: number | undefined;
    beta_zero?: number | undefined;
    count_of_ants?: number | undefined;
    node_coordinates: NodeCoordinates;

    local_pheromone_volatilization_coefficient?: number;
    global_pheromone_volatilization_coefficient?: number;
} & TSPRunnerOptions;
