import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { COMMON_DataOfOneIteration, COMMON_TSP_Output } from "./tsp-interface";

export type MultiPopulationOutput = COMMON_TSP_Output & {
    IterationDataOfIndividualPopulations: COMMON_DataOfOneIteration[][];
    RouteDataOfIndividualPopulations: DataOfFinishOneRoute[][];
};
