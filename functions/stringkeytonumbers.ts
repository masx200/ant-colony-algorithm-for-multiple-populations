export function stringkeytonumbers(
    value: `${number},${number}`,
): [number, number] {
    const s = value;
    const a = s.split(",");
    const left = Number(a[0]);
    const right = Number(a[1]);
    return [left, right];
}
