import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { uniqBy } from "lodash-es";
import { cycle_route_to_segments } from "../functions/cycle_route_to_segments";

export function createSmoothPheromones(
    pheromone_volatilization_coefficient_of_communication: number,
    pheromoneStore: MatrixSymmetry<number>,
    global_optimal_routes: { route: number[] }[]
) {
    return function smoothPheromones(similarity: number) {
        const maxValue = Math.max(...pheromoneStore.values());
        const minValue = Math.min(...pheromoneStore.values());
        const Value = (maxValue + minValue) / 2;
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
            const value =
                (1 - pheromone_volatilization_coefficient_of_communication) *
                    pheromoneStore.get(i, j) +
                pheromone_volatilization_coefficient_of_communication *
                    Value *
                    (1 - similarity);
            pheromoneStore.set(i, j, value);
        }
    };
}
