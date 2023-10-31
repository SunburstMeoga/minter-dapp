<template>
    <div>
        <div class="bg-black fixed top-0 left-0 w-screen h-screen z-50 opacity-80 overflow-hidden" v-show="visible">

            <div class="w-full h-full flex justify-center items-center">
                <div class="w-7/12">
                    <img src="../../assets/images/loading.gif" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    emits: {
        onConfirm: null,
        onCancel: null,
    },
    setup(props, context) {
        let tempData = Object.assign({}, props);
        const propsData = reactive(tempData);
        // const handleConfirm = () => {
        //   propsData.visible = false;
        //   context.emit("onConfirm");
        // };
        // const handleCancel = () => {
        //   propsData.visible = false;
        //   context.emit("onCancel");
        // };

        return {
            ...toRefs(propsData),
            //   handleCancel,
            //   handleConfirm,
        };
    },
});
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>