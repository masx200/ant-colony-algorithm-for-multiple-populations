export function assignOwnKeys(target: object, source: object): void {
    Reflect.ownKeys(source).forEach((k) => {
        Reflect.set(target, k, Reflect.get(source, k));
    });
}
