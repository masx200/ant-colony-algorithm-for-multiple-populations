import { create_TSP_Worker_comlink } from "../src/create_TSP_Worker_comlink";
import { DefaultOptions } from "../src/default_Options";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { TSP_Worker_Remote } from "../src/TSP_Worker_Remote";
import { COMMON_TSP_Output } from "./tsp-interface";
export interface MultiPopulationScheduler {
    runOneIteration: () => Promise<void>;
    getOutputDataAndConsumeIterationData: () => COMMON_TSP_Output;
    runIterations: (iterations: number) => Promise<void>;
    getBestLength: () => number;
    getBestRoute: () => number[];
}
export type WorkerRemoteAndInfo = TSP_Worker_Remote & {
    ClassOfPopulation: string;
    id_Of_Population: number;
};

export async function MultiPopulationScheduler(
    input: TSPRunnerOptions
): Promise<MultiPopulationScheduler> {
    const options = Object.assign(structuredClone(DefaultOptions), input);
    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        number_of_populations_of_the_first_category,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        number_of_the_second_type_of_population,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // node_coordinates,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        population_communication_iterate_cycle,
    } = options;

    const remoteworkers: WorkerRemoteAndInfo[] = [];
    for (
        let index = 0;
        index < number_of_populations_of_the_first_category;
        index++
    ) {
        const remote: WorkerRemoteAndInfo = Object.assign(
            await create_TSP_Worker_comlink(
                structuredClone({
                    ...options,
                    ClassOfPopulation: "动态信息素更新",
                })
            ),
            {
                ClassOfPopulation: "动态信息素更新",
                id_Of_Population: remoteworkers.length,
            }
        );
        remoteworkers.push(remote);
    }
    for (
        let index = 0;
        index < number_of_the_second_type_of_population;
        index++
    ) {
        const remote: TSP_Worker_Remote & {
            ClassOfPopulation: string;
            id_Of_Population: number;
        } = Object.assign(
            await create_TSP_Worker_comlink(
                structuredClone({
                    ...options,
                    ClassOfPopulation: "相似度的自适应",
                })
            ),
            {
                ClassOfPopulation: "相似度的自适应",
                id_Of_Population: remoteworkers.length,
            }
        );
        remoteworkers.push(remote);
    }
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
