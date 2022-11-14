import { assert_true } from "../test/assert_true";
import { cycle_route_to_segments } from "../functions/cycle_route_to_segments";
export function extractCommonRoute(routes: number[][]): number[][] {
    assert_true(routes.length > 0);
    const n = routes[0].length;
    assert_true(n > 0);
    const result: number[][] = Array(n)
        .fill(0)
        .map(() => Array(n).fill(0));

    let max = 0;
    for (const route of routes) {
        for (const [x, y] of cycle_route_to_segments(route)) {
            result[x][y]++;
            result[y][x]++;
            max = Math.max(max, result[x][y]);
        }
    }

    result.forEach((a, i) => {
        a.forEach((v, j) => (result[i][j] = v / max));
    });

    return result;
}
