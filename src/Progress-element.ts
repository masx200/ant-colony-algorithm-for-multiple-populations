import { ElProgress } from "element-plus";
import { defineComponent } from "vue";
export default defineComponent({
    components: { ElProgress },
    props: {
        percentage: { type: Number, required: true },
        indeterminate: { type: Boolean, required: true },
    },
});
