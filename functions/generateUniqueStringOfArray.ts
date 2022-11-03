import { stringify_replacer } from "./stringify_replacer";

export function generateUniqueStringOfArray(value: any[]): string {
    if (!Array.isArray(value)) {
        throw new Error("invalid value, expected array argument");
    }
    return JSON.stringify(value, stringify_replacer());
}
