import { COMMON_TSP_Output } from "../classic-acs/tsp-interface";
import { RunnerMultipleCommunicative } from "../src/RunnerMultipleCommunicative";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { NodeCoordinates } from "./NodeCoordinates";
import { ReadOnlyPheromone } from "./ReadOnlyPheromone";
import { SharedOptions } from "./SharedOptions";

export type TSP_Runner = Required<TSPRunnerOptions> &
    SharedOptions & {
        count_of_nodes: number;
        get_random_selection_probability(): number;
        getTimeOfBest(): number;
        getSearchCountOfBest(): number;

        runOneIteration: () => Promise<void>;

        getTotalTimeMs: () => number;

        runIterations: (iterations: number) => Promise<void>;

        getCountOfIterations: () => number;

        getBestLength: () => number;
        getBestRoute: () => number[];
        getCurrentSearchCount: () => number;
        pheromoneStore: ReadOnlyPheromone;

        [Symbol.toStringTag]: string;

        node_coordinates: NodeCoordinates;
        alpha_zero: number;
        beta_zero: number;
        count_of_ants: number;

        getOutputDataAndConsumeIterationAndRouteData: () => Promise<COMMON_TSP_Output>;
    } & RunnerMultipleCommunicative;
