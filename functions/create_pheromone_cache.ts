import { MatrixFill, MatrixSymmetryCreate } from "@masx200/sparse-2d-matrix";

import { PheromoneCache } from "./PheromoneCache";

export function create_pheromone_cache(count_of_nodes: number): PheromoneCache {
    const pheromone_cache = MatrixSymmetryCreate({ row: count_of_nodes });

    return {
        clear() {
            MatrixFill(pheromone_cache, 0);
        },
        // row: count_of_nodes,
        get: function (row: number, column: number): number {
            return pheromone_cache.get(row, column);
        },
        // column: count_of_nodes,
        set: function (row: number, column: number, value: number) {
            pheromone_cache.set(row, column, value);
        },
    };
}
