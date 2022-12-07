import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { COMMON_DataOfOneIteration, COMMON_TSP_Output } from "./tsp-interface";

export type MultiPopulationOutput = COMMON_TSP_Output & {
    similarityOfAllPopulationsHistory: number[];
    IterationDataOfIndividualPopulations: COMMON_DataOfOneIteration[][];
    RouteDataOfIndividualPopulations: DataOfFinishOneRoute[][];
    HistoryOfTheWayPopulationsCommunicate: string[];
    HistoryOfPopulationsAllUpdateBestRoute: boolean[];
};
