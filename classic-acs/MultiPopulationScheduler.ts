import { DefaultOptions } from "../src/default_Options";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { COMMON_TSP_Output } from "./tsp-interface";
export interface MultiPopulationScheduler {
    runOneIteration: () => Promise<void>;
    getOutputDataAndConsumeIterationData: () => COMMON_TSP_Output;
    runIterations: (iterations: number) => Promise<void>;
    getBestLength: () => number;
    getBestRoute: () => number[];
}
export function MultiPopulationScheduler(
    input: TSPRunnerOptions
): MultiPopulationScheduler {
    const options = Object.assign(structuredClone(DefaultOptions), input);
    return {};
}
