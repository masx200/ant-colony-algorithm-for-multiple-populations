import { CommonTspRunner } from "./CommonTspRunner";
import { MultiPopulationOutput } from "./MultiPopulationOutput";
export interface MultiPopulationScheduler extends CommonTspRunner {
    getOutputDataAndConsumeIterationAndRouteData: () => Promise<MultiPopulationOutput>;
}
