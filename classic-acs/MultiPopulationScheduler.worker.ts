import { expose } from "comlink";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { MultiPopulationSchedulerAPI } from "./MultiPopulationSchedulerAPI";
import { MultiPopulationScheduler } from "./MultiPopulationScheduler";
import { MultiPopulationSchedulerCreate } from "./MultiPopulationSchedulerCreate";
let runner: MultiPopulationScheduler | undefined = undefined;
async function init_runner(options: TSPRunnerOptions) {
    if (runner) {
        throw new Error("cannot init runner twice");
    }

    runner = await MultiPopulationSchedulerCreate(options);
    Object.assign(API, runner);
    // console.log(API);
}

const API: MultiPopulationSchedulerAPI = {
    init_runner,
} as MultiPopulationSchedulerAPI;
expose(API);
self.addEventListener("unhandledrejection", (e) => {
    // console.log(self);
    // console.error(e);
    throw e.reason;
});
