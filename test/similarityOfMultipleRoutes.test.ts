import { test, assert } from "vitest";
import { similarityOfMultipleRoutes } from "../similarity/similarityOfMultipleRoutes";
test("similarityOfMultipleRoutes", () => {
    assert.equal(
        1,
        similarityOfMultipleRoutes(
            [
                [1, 2, 3, 0],
                [1, 2, 3, 0],
            ],
            [3, 0, 1, 2],
        ),
    );
    assert.equal(
        0.75,
        similarityOfMultipleRoutes(
            [
                [1, 3, 2, 0],
                [3, 0, 1, 2],
            ],
            [3, 0, 1, 2],
        ),
    );
    assert.equal(
        0.5,
        similarityOfMultipleRoutes(
            [
                [1, 3, 2, 0, 4],
                [3, 0, 1, 2, 4],
            ],
            [3, 0, 1, 2, 4],
        ),
    );
});
