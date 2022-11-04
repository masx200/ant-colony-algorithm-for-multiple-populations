import { similarityOfTwoRoutes } from "./similarityOfTwoRoutes";

export function similarityOfMultipleRoutes(
    routes: number[][],
    bestRoute: number[]
): number {
    return (
        routes.reduce(
            (p, route) => p + similarityOfTwoRoutes(route, bestRoute),
            0
        ) / routes.length
    );
}
