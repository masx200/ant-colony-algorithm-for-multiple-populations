export function run_idle_work(work: () => void, timeout: number = 2000) {
    const startTask = (deadline: {
        timeRemaining: () => number;
        didTimeout: boolean;
    }) => {
        if (deadline.timeRemaining() > 0 || deadline.didTimeout) {
            work();
        } else {
            requestIdleCallback(startTask, { timeout: timeout });
        }
    };

    requestIdleCallback(startTask, { timeout: timeout });
}
