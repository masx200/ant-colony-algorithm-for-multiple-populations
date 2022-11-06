import { similarityOfTwoRoutes } from "./similarityOfTwoRoutes";
import assert from "assert";

export function similarityOfMultipleRoutes(
    routes: number[][],
    bestRoute: number[]
): number {
    assert(routes.every((r) => r.length === bestRoute.length));
    return (
        routes.reduce(
            (p, route) => p + similarityOfTwoRoutes(route, bestRoute),
            0
        ) / routes.length
    );
}
