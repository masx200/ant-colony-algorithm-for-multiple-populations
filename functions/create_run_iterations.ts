import { assert_number } from "../test/assert_number";
import { assert_true } from "../test/assert_true";

export function create_run_iterations(runOneIteration: () => Promise<void>) {
    return async (iterations: number) => {
        if (iterations === 1) return await runOneIteration();
        assert_number(iterations);
        assert_true(iterations > 0);

        for (let i = 0; i < iterations; i++) {
            await runOneIteration();
        }
    };
}
