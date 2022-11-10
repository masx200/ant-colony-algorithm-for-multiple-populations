import { max_number_of_stagnation } from "../functions/max_number_of_stagnation";
import { relative_Information_Entropy_Factor } from "../functions/relative_Information_Entropy_Factor";
import { TSPDefaultOptions } from "./TSPRunnerOptions";

export const default_count_of_ants = 20;
export const default_search_rounds = 170;
export const default_search_time_seconds = 600;

export const default_alpha = 1;
export const default_beta = 4;

export const default_max_results_of_k_opt = 10;
export const default_max_results_of_2_opt = 10;
export const default_max_results_of_k_exchange = 10;

export { DefaultOptions };

const DefaultOptions: Required<TSPDefaultOptions> = {
    id_Of_Population: 0,
    max_results_of_k_exchange: default_max_results_of_k_exchange,
    max_cities_of_state_transition: 40,
    max_results_of_2_opt: default_max_results_of_2_opt,
    max_results_of_k_opt: default_max_results_of_k_opt,
    alpha_zero: default_alpha,
    beta_zero: default_beta,
    count_of_ants: default_count_of_ants,
    max_size_of_collection_of_optimal_routes: 10,

    max_routes_of_greedy: 20,
    max_segments_of_cross_point: 40,

    max_cities_of_greedy: 300,
    distance_round: true,
    relative_Information_Entropy_Factor: relative_Information_Entropy_Factor,
    max_number_of_stagnation: max_number_of_stagnation,
    number_of_populations_of_the_first_category: 2,
    number_of_the_second_type_of_population: 2,
    population_communication_iterate_cycle: 15,
    global_pheromone_volatilization_coefficient: 0.1,
    local_pheromone_volatilization_coefficient: 0.1,
    path_selection_parameter_q0_max: 0.9,
    path_selection_parameter_q0_min: 0.4,
    alpha_for_the_second_type_of_population: 1,
    beta_for_the_second_type_of_population: 2,
};
