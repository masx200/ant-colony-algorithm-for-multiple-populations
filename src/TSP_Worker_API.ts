import { TSP_Runner } from "../functions/TSP_Runner";

import { TSPRunnerOptions } from "./TSPRunnerOptions";

export type TSP_Worker_API = TSP_Runner & {
    init_runner: (options: TSPRunnerOptions) => void;
};
