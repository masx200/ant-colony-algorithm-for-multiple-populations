import { createMultiPopulationSchedulerWorker } from "../classic-acs/createMultiPopulationSchedulerWorker";
import { Fun_initialize_TSP_runner } from "./Fun_initialize_TSP_runner";

export function use_initialize_tsp_runner(): Fun_initialize_TSP_runner {
    return async function initializeTSP_runner({
        node_coordinates,
        count_of_ants,

        ...rest
    }) {
        const runner = await createMultiPopulationSchedulerWorker({
            node_coordinates,
            count_of_ants,
            ...rest,
        });

        return runner;
    };
}
