export async function sleep_requestAnimationFrame_async_or_settimeout(): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 20);
        requestAnimationFrame(() => {
            resolve();
        });
    });
}
