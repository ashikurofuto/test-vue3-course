export default {
    data(){
        return {
        }

    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideDialogue()
        {
            this.$emit('update:show',false);
        },
    },
    mounted() {

    }
}