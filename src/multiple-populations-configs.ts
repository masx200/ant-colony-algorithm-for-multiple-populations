import { PropType, defineComponent } from "vue";

import { CommunicationStrategy } from "./CommunicationStrategy";
import { DefaultOptions } from "./default_Options";

export default defineComponent({
    setup() {
        return {
            CommunicationStrategy: {
                All: CommunicationStrategy.All,
                First: CommunicationStrategy.First,
                Second: CommunicationStrategy.Second,
                Third: CommunicationStrategy.Third,
            },
        };
    },
    props: {
        input_options: {
            required: true,
            type: Object as PropType<typeof DefaultOptions>,
        },
        disable_switching: { type: Boolean, required: true },
    },
});
