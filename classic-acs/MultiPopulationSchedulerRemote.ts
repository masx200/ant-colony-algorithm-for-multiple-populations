import { Remote } from "comlink";
import { MultiPopulationSchedulerAPI } from "./MultiPopulationSchedulerAPI";

export interface MultiPopulationSchedulerRemote {
    remote: Remote<MultiPopulationSchedulerAPI>;
    worker: Worker;
    terminate: () => void;
}
