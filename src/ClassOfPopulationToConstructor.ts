import { tsp_similarity_execution_and_local_optimization_with_Optional_city_rewards_and_punishments } from "../classic-acs/tsp_similarity_execution_and_local_optimization_with_Optional-city-rewards-and-punishments";
import { createTSPrunner } from "../functions/createTSPrunner";
import { RunnerMultipleCommunicative } from "./RunnerMultipleCommunicative";
import { TSPRunnerOptions } from "./TSPRunnerOptions";

export const ClassOfPopulationToConstructor: Record<
    string,
    () => (input: TSPRunnerOptions) => RunnerMultipleCommunicative
> = {
    动态信息素更新: () => createTSPrunner,
    相似度的自适应: () =>
        tsp_similarity_execution_and_local_optimization_with_Optional_city_rewards_and_punishments,
};
