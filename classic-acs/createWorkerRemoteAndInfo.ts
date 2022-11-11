import { NodeCoordinates } from "@masx200/tsp-lib-test-data";
import { create_TSP_Worker_comlink } from "../src/create_TSP_Worker_comlink";
import { TSPDefaultOptions } from "../src/TSPRunnerOptions";
import { WorkerRemoteAndInfo } from "./MultiPopulationScheduler";

export async function createWorkerRemoteAndInfo(
    number_of_populations_of_the_first_category: number,
    options: Required<TSPDefaultOptions> & {
        node_coordinates: NodeCoordinates;
    } & Partial<TSPDefaultOptions>,
    remoteworkers: WorkerRemoteAndInfo[],
    ClassOfPopulation: string
) {
    for (
        let index = 0;
        index < number_of_populations_of_the_first_category;
        index++
    ) {
        const remote: WorkerRemoteAndInfo = Object.assign(
            Object.create(
                (
                    await create_TSP_Worker_comlink(
                        structuredClone({
                            ...options,
                            ClassOfPopulation: ClassOfPopulation,
                        })
                    )
                ).remote
            ),
            {
                ClassOfPopulation: ClassOfPopulation,
                id_Of_Population: remoteworkers.length,
            }
        );
        remoteworkers.push(remote);
    }
}
