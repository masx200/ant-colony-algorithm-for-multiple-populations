import { NodeCoordinates } from "@masx200/tsp-lib-test-data";
import { create_TSP_Worker_comlink } from "../src/create_TSP_Worker_comlink";
import { TSPDefaultOptions } from "../src/TSPRunnerOptions";
import { WorkerRemoteAndInfo } from "./MultiPopulationSchedulerCreate";

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
        const remote: WorkerRemoteAndInfo = Object.create(
            (
                await create_TSP_Worker_comlink(
                    structuredClone({
                        ...options,
                        ClassOfPopulation: ClassOfPopulation,
                    })
                )
            ).remote
        );
        Object.defineProperty(remote, "ClassOfPopulation", {
            value: ClassOfPopulation,
        });
        Object.defineProperty(remote, "id_Of_Population", {
            value: remoteworkers.length,
        });

        // console.log(remote);
        // console.log(remote.ClassOfPopulation);
        // console.log(remote.id_Of_Population);
        remoteworkers.push(remote);
    }
}
