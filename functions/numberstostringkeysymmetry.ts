export function numberstostringkeysymmetry(
    left: number,
    right: number,
): `${number},${number}` {
    const max = Math.max(left, right);
    const min = Math.min(left, right);
    return `${min},${max}`;
}
