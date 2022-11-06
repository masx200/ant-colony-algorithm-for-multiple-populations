export function* whether_3_sections_reverse_opt(): Generator<
    [boolean, boolean, boolean],
    void,
    unknown
> {
    for (const i of [true, false]) {
        for (const j of [true, false]) {
            for (const k of [true, false]) {
                yield [i, j, k];
            }
        }
    }
}
