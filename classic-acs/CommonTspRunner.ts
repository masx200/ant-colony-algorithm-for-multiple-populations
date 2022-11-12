import { COMMON_TSP_Output } from "./tsp-interface";

export interface CommonTspRunner {
    getTimeOfBest(): number;
    getSearchCountOfBest(): number;
    getCountOfIterations: () => number;
    runOneIteration: () => Promise<void>;
    getOutputDataAndConsumeIterationAndRouteData: () => Promise<COMMON_TSP_Output>;
    runIterations: (iterations: number) => Promise<void>;
    getCurrentSearchCount(): number;
    getBestLength: () => number;
    getTotalTimeMs: () => number;
    getBestRoute: () => number[];
}
