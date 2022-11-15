import { CommonTspRunner } from "./CommonTspRunner";
import { COMMON_DataOfOneIteration, COMMON_TSP_Output } from "./tsp-interface";

export interface MultiPopulationScheduler extends CommonTspRunner {
    getOutputDataAndConsumeIterationAndRouteData: () => Promise<
        COMMON_TSP_Output & {
            IterationDataForIndividualPopulations: COMMON_DataOfOneIteration[][];
        }
    >;
}
