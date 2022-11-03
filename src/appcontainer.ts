import { assert_true } from "../test/assert_true";

export const appcontainer = (() => {
    const app = document.querySelector<HTMLDivElement>("#app");
    assert_true(app);
    return app;
})();
