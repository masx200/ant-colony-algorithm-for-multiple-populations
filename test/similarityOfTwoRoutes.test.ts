import { test, assert } from "vitest";
import { similarityOfTwoRoutes } from "../similarity/similarityOfTwoRoutes";
test("similarityOfTwoRoutes", () => {
    assert.equal(1, similarityOfTwoRoutes([1, 2, 3, 0], [3, 0, 1, 2]));
    assert.equal(0.5, similarityOfTwoRoutes([1, 3, 2, 0], [3, 0, 1, 2]));
    assert.equal(0, similarityOfTwoRoutes([1, 3, 2, 0, 4], [3, 0, 1, 2, 4]));
});
