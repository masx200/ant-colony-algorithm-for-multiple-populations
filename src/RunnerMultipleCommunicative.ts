import { CommonTspRunner } from "../classic-acs/CommonTspRunner";
import { COMMON_TSP_Output } from "../classic-acs/tsp-interface";

export interface RunnerMultipleCommunicative extends CommonTspRunner {
    getTotalTimeMs: () => number;
    runOneIteration: () => Promise<void>;
    runIterations: (iterations: number) => Promise<void>;
    getOutputDataAndConsumeIterationAndRouteData: () => Promise<COMMON_TSP_Output>;
    getCurrentSearchCount(): number;
    updateBestRoute(route: number[], length: number): void;
    smoothPheromones(similarity: number): void;
    getBestLength: () => number;
    getBestRoute: () => number[];
    rewardCommonRoutes(common: number[][]): void;
    getLatestIterateBestRoutesInPeriod(period: number): number[][];
}
