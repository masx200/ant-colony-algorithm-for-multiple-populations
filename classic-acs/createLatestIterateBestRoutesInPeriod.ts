import { maxBy } from "lodash-es";

export function createLatestIterateBestRoutesInPeriod() {
    function onUpdateIterateBestRoutesInPeriod(
        routes_and_lengths_of_one_iteration: {
            route: number[];
            length: number;
            time_ms: number;
        }[]
    ) {
        const iterate_best_route = maxBy(
            routes_and_lengths_of_one_iteration,
            (a) => a.length
        )?.route;
        if (iterate_best_route)
            latestIterateBestRoutesInPeriod.push(iterate_best_route);
    }
    let latestIterateBestRoutesInPeriod: number[][] = [];
    function getLatestIterateBestRoutesInPeriod(period: number) {
        const result = latestIterateBestRoutesInPeriod.slice(-period);
        if (latestIterateBestRoutesInPeriod.length > period) {
            latestIterateBestRoutesInPeriod =
                latestIterateBestRoutesInPeriod.slice(-period);
        }

        return result;
    }
    return {
        getLatestIterateBestRoutesInPeriod,
        onUpdateIterateBestRoutesInPeriod,
    };
}
