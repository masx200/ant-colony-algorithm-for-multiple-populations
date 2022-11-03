export function haverepetitions(arr: number[]): boolean {
    const set = new Set(arr);
    return set.size != arr.length;
}
