import { assert_number } from "../test/assert_number";
import { assert_true } from "../test/assert_true";
import { assignOwnKeys } from "./assignOwnKeys";
import { get_entries_by_max_value } from "./get_entries_by_max_value";
import type { CollectionOfOptimalRoutes } from "./CollectionOfOptimalRoutes";
export type { CollectionOfOptimalRoutes };
export function create_collection_of_optimal_routes(
    max_size: number
): CollectionOfOptimalRoutes {
    assert_true(0 < max_size, "max_size greater than 0");

    const result: Array<{
        route: number[];
        length: number;
    }> = Array(0);
    function get_longest_length_of_routes():
        | { index: number; value: number }
        | undefined {
        if (result.length === 0) {
            return;
        } else {
            const [index, value] = get_entries_by_max_value(
                result.map((a) => a.length)
            );
            return { index, value };
        }
    }

    assignOwnKeys(result, {
        max_size,
        get [Symbol.toStringTag]() {
            return "CollectionOfOptimalRoutes";
        },
        add: (route: number[], length: number) => {
            assert_true(route.length > 0, "route length is not greater than 0");
            assert_number(length);
            assert_true(0 < length, "length must be greater than 0");
            assert_true(Infinity > length);
            if (result.some((a) => a.length === length)) {
                return;
            }
            if (result.length < max_size) {
                result.push({ route, length });
                return;
            }

            const longest = get_longest_length_of_routes();
            if (longest) {
                if (length > longest.value) {
                    return;
                }
            }

            result.push({ route, length });

            while (result.length > max_size) {
                const longest = get_longest_length_of_routes();
                assert_true(longest);
                const index = longest.index;
                assignOwnKeys(
                    result,
                    Array.from(result).filter((_v, i) => i !== index)
                );
            }
        },
    });
    return result as CollectionOfOptimalRoutes;
}
