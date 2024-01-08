import { TSPDefaultOptions } from "../src/TSPRunnerOptions";
import { createWorkerRemoteAndInfo } from "./createWorkerRemoteAndInfo";
import { NodeCoordinates } from "@masx200/tsp-lib-test-data";
import { WorkerRemoteAndInfo } from "./MultiPopulationSchedulerCreate";

export async function initializeRemoteWorkers(
    number_of_populations_of_the_first_category: number,
    options: Required<TSPDefaultOptions> & {
        node_coordinates: NodeCoordinates;
    } & Partial<TSPDefaultOptions>,
    number_of_the_second_type_of_population: number,
) {
    const remoteWorkers: WorkerRemoteAndInfo[] = [];
    await createWorkerRemoteAndInfo(
        number_of_populations_of_the_first_category,
        options,
        remoteWorkers,
        "动态信息素更新",
    );
    await createWorkerRemoteAndInfo(
        number_of_the_second_type_of_population,
        options,
        remoteWorkers,
        "相似度的自适应",
    );
    return remoteWorkers;
}
