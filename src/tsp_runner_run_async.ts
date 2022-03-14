// import { TSPRunner } from "../functions/createTSPrunner";
import { sleep_requestAnimationFrame_async_or_settimeout } from "./sleep_requestAnimationFrame_async_or_settimeout";

export async function tsp_runner_run_async(
    runner: { runOneIteration: () => Promise<void> },
    roundofsearch: number
): Promise<void> {
    for (let i = 0; i < roundofsearch; i++) {
        await runner.runOneIteration();
        await sleep_requestAnimationFrame_async_or_settimeout();
    }
}