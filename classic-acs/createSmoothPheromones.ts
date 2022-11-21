import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { uniqBy } from "lodash-es";
import { cycle_route_to_segments } from "../functions/cycle_route_to_segments";

export function createSmoothPheromones(
    // pheromone_volatilization_coefficient_of_communication: number,
    pheromoneStore: MatrixSymmetry<number>,
    global_optimal_routes: { route: number[] }[]
) {
    return function smoothPheromones(similarity: number) {
        const maxValue = Math.max(...pheromoneStore.values());
        const minValue = Math.min(...pheromoneStore.values());
        const averageValue = (maxValue + minValue) / 2;
        const segments = uniqBy(
            global_optimal_routes
                .map(({ route }) => cycle_route_to_segments(route))
                .flat(),
            function (a) {
                if (a[0] > a[1]) return JSON.stringify([a[1], a[0]]);
                return JSON.stringify(a);
            }
        );
        for (const [i, j] of segments) {
            const oldValue = pheromoneStore.get(i, j);
            const newValue = Math.max(
                averageValue / 2,
                oldValue * Math.min(1, 3 * (1 - similarity))
            ); /* +
                pheromone_volatilization_coefficient_of_communication *
                    averageValue *
                    Math.pow(1 - similarity, 3) *
                    2; */
            // (1 - pheromone_volatilization_coefficient_of_communication) *
            pheromoneStore.set(i, j, newValue);
        }
    };
}
