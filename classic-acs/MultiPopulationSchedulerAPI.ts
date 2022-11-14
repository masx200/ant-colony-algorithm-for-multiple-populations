import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { MultiPopulationScheduler } from "./MultiPopulationScheduler";

export type MultiPopulationSchedulerAPI = MultiPopulationScheduler & {
    init_runner: (options: TSPRunnerOptions) => Promise<void>;
};
