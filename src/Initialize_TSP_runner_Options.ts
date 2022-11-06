import { NodeCoordinates } from "../functions/NodeCoordinates";
import { TSPRunnerOptions } from "./TSPRunnerOptions";

export type Initialize_TSP_runner_Options = TSPRunnerOptions & {
    node_coordinates: NodeCoordinates;
    count_of_ants: number;
};
