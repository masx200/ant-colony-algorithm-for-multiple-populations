import { RunnerMultipleCommunicative } from "../src/RunnerMultipleCommunicative";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { NodeCoordinates } from "./NodeCoordinates";
import { ReadOnlyPheromone } from "./ReadOnlyPheromone";
import { SharedOptions } from "./SharedOptions";
import { TSP_Output_Data } from "./TSP_Output_Data";

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

        getOutputDataAndConsumeIterationAndRouteData: () => TSP_Output_Data;
    } & RunnerMultipleCommunicative;
