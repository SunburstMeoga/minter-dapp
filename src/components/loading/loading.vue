<template>
    <div>
        <div id="loader-wrapper" class="backdrop-blur-3xl  bg-black/80" v-show="visible">
            <div id="loader"></div>
            <div class="load_title">请稍等...</div>
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
.load_title {
    color: #E20F2A;
    font-size: 18px;
    width: 100%;
    text-align: center;
    z-index: 9999999999999;
    position: absolute;
    top: 50%;
    opacity: 1;
    line-height: 30px;
    padding-top: 10px;
}

#loader-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999999;
    opacity: 0.8;
    overflow: hidden;
}

#loader {
    display: block;
    position: relative;
    left: 50%;
    top: 40%;
    z-index: 1001;
    width: 90px;
    height: 90px;
    margin: -45px 0 0 -45px;
    border-radius: 50%;
    border: 6px solid transparent;
    border-top-color: #E20F2A;
    -webkit-animation: spin 2s linear infinite;
    -ms-animation: spin 2s linear infinite;
    -moz-animation: spin 2s linear infinite;
    -o-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}

#loader:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 4px solid transparent;
    border-top-color: #E20F2A;
    -webkit-animation: spin 3s linear infinite;
    -ms-animation: spin 3s linear infinite;
    -moz-animation: spin 3s linear infinite;
    -o-animation: spin 3s linear infinite;
    animation: spin 3s linear infinite;
}

#loader:after {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: #E20F2A;
    -webkit-animation: spin 1.5s linear infinite;
    -ms-animation: spin 1.5s linear infinite;
    -moz-animation: spin 1.5s linear infinite;
    -o-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
}

@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>