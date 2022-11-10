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
    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        number_of_populations_of_the_first_category,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        number_of_the_second_type_of_population,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        node_coordinates,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        population_communication_iterate_cycle,
    } = options;
    return {
        async runIterations(iterations: number) {
            throw Error("not implemented");
        },
        async runOneIteration() {
            throw Error("not implemented");
        },
        getBestLength(): number {
            throw Error("not implemented");
        },
        getBestRoute(): number[] {
            throw Error("not implemented");
        },
        getOutputDataAndConsumeIterationData(): COMMON_TSP_Output {
            throw Error("not implemented");
        },
    };
}
