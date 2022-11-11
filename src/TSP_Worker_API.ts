import { RunnerMultipleCommunicative } from "./RunnerMultipleCommunicative";

import { TSPRunnerOptions } from "./TSPRunnerOptions";

export type TSP_Worker_API = RunnerMultipleCommunicative & {
    init_runner: (options: TSPRunnerOptions) => void;
};
