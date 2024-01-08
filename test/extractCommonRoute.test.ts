import { assert, test } from "vitest";
import { extractCommonRoute } from "../common/extractCommonRoute";
test("extractCommonRoute", () => {
    assert.deepEqual(
        extractCommonRoute([
            [1, 3, 2, 0, 4],
            [3, 0, 1, 2, 4],
            [3, 0, 1, 2, 4],
        ]),
        [
            [0, 1, 0.5, 1, 0.5],
            [1, 0, 1, 0.5, 0.5],
            [0.5, 1, 0, 0.5, 1],
            [1, 0.5, 0.5, 0, 1],
            [0.5, 0.5, 1, 1, 0],
        ],
    );
    assert.deepEqual(
        extractCommonRoute([
            [1, 2, 3, 0],
            [1, 2, 3, 0],
            [3, 0, 1, 2],
        ]),
        [
            [0, 1, 0, 1],
            [1, 0, 1, 0],
            [0, 1, 0, 1],
            [1, 0, 1, 0],
        ],
    );
});
