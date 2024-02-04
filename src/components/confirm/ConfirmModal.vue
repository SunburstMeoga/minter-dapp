
<template>
    <div class="confirm-modal">
        <transition name="fade">
            <!-- @touchmove.prevent -->
            <div class="w-full h-full flex justify-center items-center  fixed top-0 left-0 bottom-0 z-50 bg-popup-cover"
                @click="clickMaskToClose ? handleCancel() : null" v-if="visible" @touchmove.prevent>
                <div class="bg-gray-bottom p-2 rounded-lg w-9/12 flex flex-col items-center z-50 relative">
                    <div class="text-gray-200 font-bold text-lg border-b text-center border-gray-500 w-full pb-2"
                        v-if="title">
                        {{ title }}
                    </div>
                    <div class="text-gray-300 text-sm px-2 py-4 text-center break-words w-11/12">
                        {{ content }}
                    </div>
                    <!-- <div class="split-line-top"></div> -->
                    <div class="w-full flex justify-between items-center py-2">
                        <!-- <div class="rounded-full border border-primary-color py-1 text-primary-color w-5/12 text-center"
                            @click="handleCancel" v-if="showCancelButton">
                            <div v-show="isWaiting">
                                正在授权
                            </div>
                            <div v-show="!isWaiting">
                                {{ cancelText }}
                            </div>
                        </div> -->
                        <!-- <div class="split-line-center" v-if="showCancelButton"></div> -->
                        <!-- <div class="relative operating-button text-sm text-center py-1.5 rounded-full text-white"
                            :class="showCancelButton ? 'w-5/12' : 'flex-1'" @click="handleConfirm"> -->
                        <!-- 確認按鈕 -->
                        <div v-show="!isWaiting"
                            class="relative operating-button text-sm text-center py-2  rounded-full text-white"
                            :class="showCancelButton ? 'w-5/12' : 'flex-1'" @click="handleConfirm">
                            <div>
                                {{ confirmText }}
                            </div>
                        </div>
                        <!-- 取消按鈕 -->
                        <div v-show="showCancelButton && !isWaiting"
                            class="relative border border-primary-color w-5/12 text-sm text-center py-2 rounded-full text-white"
                            @click="handleCancel">
                            <div>
                                {{ cancelText }}
                            </div>
                        </div>
                        <!-- 等待按鈕 -->
                        <div v-show="isWaiting"
                            class="relative disable-button text-sm text-center py-2 flex-1 rounded-full text-white">
                            <div class="flex justify-center items-center">
                                <div class="icon iconfont icon-loading animate-spin"></div>
                                <!-- <div class="pl-2">
                                    請稍候...
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
  
<script>
import { ref, defineComponent, reactive, toRefs } from "vue";
import { showToast } from 'vant'
export default defineComponent({
    props: {
        isWaiting: {
            type: Boolean,
            default: false
        },
        visible: {
            type: Boolean,
            default: false,
        },
        showCancelButton: {
            type: Boolean,
            default: false,
        },
        showConfirmButton: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: "提示",
        },
        content: {
            type: String,
            default: "内容",
        },
        confirmText: {
            type: String,
            default: "我知道了",
        }, // 确认按钮文本
        confirmColor: {
            type: String,
            default: "#E20F2A",
        },
        cancelText: {
            type: String,
            default: "取消",
        }, // 取消按钮文本
        clickMaskToClose: {
            type: Boolean,
            default: false,
        }, // 点击遮罩是否隐藏
    },

    emits: {
        onConfirm: null,
        onCancel: null,
    },
    setup(props, context) {
        let tempData = Object.assign({}, props);
        const propsData = reactive(tempData);
        const handleConfirm = () => {
            // propsData.visible = false;
            if (propsData.isWaiting) {
                showToast('正在等待操作結果，請稍候')
                return
            }
            context.emit("onConfirm");

            propsData.isWaiting = true
        };
        const handleCancel = () => {
            propsData.visible = false;
            context.emit("onCancel");
        };
        return {
            ...toRefs(propsData),
            handleCancel,
            handleConfirm,

        };
    },
});
</script>
<style scoped>
.modal-dialog {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    z-index: 999;
    transform: translateZ(9999px);
    letter-spacing: 0;
    background: rgba(0, 0, 0, 0.8);
}

.modal {
    position: absolute;
    top: 40%;
    left: 50%;
    z-index: 1000;
    width: 300px;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    background: #18181B;
    border-radius: 8px;
    color: #FBFBFB;
}

.modal-title {
    padding: 24px 28px 0 28px;
    font-size: 18px;
    line-height: 25px;
    color: #71717a;
}

.modal-content {
    font-size: 16px;
    line-height: 21px;
    color: #5e5f64;
    padding: 16px 24px 24px 24px;
}

.no-title-content {
    font-size: 16px;
    padding: 28px;
    color: #333333;
}

.modal-right {
    padding-right: 10px;
    width: 36px;
    background: #f2f2f2;
    color: rgba(0, 16, 38, 0.3);
    font-size: 12px;
    border-radius: 0 4px 4px 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
}

.split-line-top {
    height: 1px;
    transform: scale(1, 0.5);
    background: #e8eaef;
}

.modal-footer {
    width: 100%;
    display: flex;
    align-items: center;
    height: 52px;
    font-size: 16px;
    line-height: 52px;
    text-align: center;
}

.split-line-center {
    width: 1px;
    height: 100%;
    transform: scale(0.5, 1);
    background: #e8eaef;
}

.btn-cancel {
    flex: 1;
}

.btn-confirm {
    position: relative;
    flex: 1;
    color: #E20F2A;
}
</style>
  
  