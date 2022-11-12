import { CommonTspRunner } from "../classic-acs/CommonTspRunner";
import { TSP_Output_Data } from "../functions/TSP_Output_Data";

export interface RunnerMultipleCommunicative extends CommonTspRunner {
    getTotalTimeMs: () => number;
    runOneIteration: () => Promise<void>;
    runIterations: (iterations: number) => Promise<void>;
    getOutputDataAndConsumeIterationData: () => TSP_Output_Data;
    getCurrentSearchCount(): number;
    updateBestRoute(route: number[], length: number): void;
    smoothPheromones(similarity: number): void;
    getBestLength: () => number;
    getBestRoute: () => number[];
    rewardCommonRoutes(common: number[][]): void;
}
