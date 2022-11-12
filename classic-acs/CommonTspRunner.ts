import { COMMON_TSP_Output } from "./tsp-interface";

export interface CommonTspRunner {
    getCountOfIterations: () => number;
    runOneIteration: () => Promise<void>;
    getOutputDataAndConsumeIterationData: () => COMMON_TSP_Output;
    runIterations: (iterations: number) => Promise<void>;
    getCurrentSearchCount(): number;
    getBestLength: () => number;
    getTotalTimeMs: () => number;
    getBestRoute: () => number[];
}
