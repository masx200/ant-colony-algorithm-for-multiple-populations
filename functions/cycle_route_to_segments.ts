export function cycle_route_to_segments(route: number[]): [number, number][] {
    return route.map((value, index, array) => {
        const nextindex: number = index === array.length - 1 ? 0 : index + 1;
        return [value, array[nextindex]];
    });
}
