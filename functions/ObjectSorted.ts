import { isObjectButNotFunction } from "./isObjectButNotFunction";

export function ObjectSorted<T extends object>(value: T): T {
    if (!isObjectButNotFunction(value)) {
        throw new Error("invalid value, expected object argument");
    }
    function ObjectEntriesSorted(value: object): [string, any][] {
        const properties = Object.entries(value).sort(function ([a], [b]) {
            if (a < b) return -1;
            else if (a > b) return 1;
            return 0;
        });

        return properties;
    }
    return Object.fromEntries(ObjectEntriesSorted(value)) as T;
}
