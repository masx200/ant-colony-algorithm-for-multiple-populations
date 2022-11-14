import { MultiPopulationSchedulerRemote } from "../classic-acs/MultiPopulationSchedulerRemote";
import { Initialize_TSP_runner_Options } from "./Initialize_TSP_runner_Options";

export type Fun_initialize_TSP_runner = ({
    node_coordinates,
    count_of_ants,
}: Initialize_TSP_runner_Options) => Promise<MultiPopulationSchedulerRemote>;
