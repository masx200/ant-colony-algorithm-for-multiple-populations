import { isObjectButNotFunction } from "./isObjectButNotFunction";
import { ObjectSorted } from "./ObjectSorted";
import { stringify_replacer } from "./stringify_replacer";

export function generateUniqueStringOfObject(value: object): string {
    if (!isObjectButNotFunction(value)) {
        throw new Error("invalid value, expected object argument");
    }

    return JSON.stringify(ObjectSorted(value), stringify_replacer());
}
