import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { max } from "lodash-es";
export function createRewardCommonRoutes(
    pheromone_volatilization_coefficient_of_communication: number,
    pheromoneStore: MatrixSymmetry<number>,
    count_of_nodes: number
) {
    return function rewardCommonRoutes(common: number[][]): void {
        const maxValue = max(pheromoneStore.values()) as number;
        const n = count_of_nodes;
        for (let i = 0; i < n; i++)
            for (let j = i; j < n; j++) {
                if (i !== j) {
                    if (common[i][j] > 0) {
                        const value =
                            (1 -
                                pheromone_volatilization_coefficient_of_communication) *
                                pheromoneStore.get(i, j) +
                            pheromone_volatilization_coefficient_of_communication *
                                common[i][j] *
                                maxValue;
                        pheromoneStore.set(i, j, value);
                    }
                }
            }
    };
}
