export function entriesOwnKeys(target: object): [string | symbol, any][] {
    return Reflect.ownKeys(target).map((k) => {
        return [k, Reflect.get(target, k)];
    });
}
