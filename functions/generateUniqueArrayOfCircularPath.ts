import { assert_true } from "../test/assert_true";
import { cycle_reorganize } from "./cycle_reorganize";
import { reversearray } from "./reversearray";

export function generateUniqueArrayOfCircularPath(route: number[]): number[] {
    assert_true(route.length > 2);
    const start = Math.min(...route);
    const reversed = cycle_reorganize(reversearray(route), start);

    route = cycle_reorganize(route, start);

    return route[1] > reversed[1] ? reversed : route;
}
