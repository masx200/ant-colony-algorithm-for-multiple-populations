import { generate_paths_using_state_transition_probabilities } from "./generate-paths-using-state-transition-probabilities";
import { NodeCoordinates } from "./NodeCoordinates";
import { SharedOptions } from "./SharedOptions";

export function construct_one_route_all(
    options: {
        current_search_count: number;

        node_coordinates: NodeCoordinates;
        count_of_nodes: number;

        alpha_zero: number;
        beta_zero: number;
        last_random_selection_probability: number;
    } & SharedOptions,
): {
    route: number[];
    length: number;
} {
    const {
        node_coordinates,

        pheromoneStore,

        alpha_zero,
        beta_zero,
        last_random_selection_probability,
    } = options;

    const result = generate_paths_using_state_transition_probabilities({
        ...options,
        pheromoneStore,
        alpha_zero,
        beta_zero,
        random_selection_probability: last_random_selection_probability,
        node_coordinates,
    });
    return result;
}
