import { defineComponent, PropType } from "vue";
import { DefaultOptions } from "./default_Options";
export default defineComponent({
    props: {
        input_options: {
            required: true,
            type: Object as PropType<typeof DefaultOptions>,
        },
        disable_switching: { type: Boolean, required: true },
    },
});
