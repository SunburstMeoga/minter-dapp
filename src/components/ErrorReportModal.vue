<template>
    <div class="error-report-modal">
        <transition name="fade">
            <div class="w-full h-full flex justify-center items-center fixed top-0 left-0 bottom-0 z-50 bg-popup-cover"
                v-if="visible" @touchmove.prevent>
                <div
                    class="bg-gray-bottom p-4 rounded-lg w-11/12 max-w-md flex flex-col items-center z-50 relative max-h-4/5">
                    <div class="text-gray-200 font-bold text-lg border-b text-center border-gray-500 w-full pb-2">
                        {{ title }}
                    </div>

                    <!-- 错误描述 -->
                    <div class="text-gray-300 text-sm px-2 py-3 text-center break-words w-full">
                        {{ description }}
                    </div>

                    <!-- 错误详情 -->
                    <div class="w-full mb-4">
                        <div class="text-gray-400 text-xs mb-2">错误详情:</div>
                        <div class="bg-gray-800 p-3 rounded text-gray-300 text-xs max-h-40 overflow-y-auto break-all">
                            {{ formattedError }}
                        </div>
                    </div>

                    <!-- 操作按钮 -->
                    <div class="w-full flex flex-col gap-2">
                        <button @click="copyError"
                            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors"
                            :disabled="copying">
                            {{ copying ? (copyText || '复制中...') : (copyText || '复制错误信息') }}
                        </button>

                        <div class="flex gap-2 w-full">
                            <button @click="handleRetry" v-if="showRetryButton"
                                class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors">
                                {{ retryText || '重试' }}
                            </button>

                            <button @click="handleClose"
                                class="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors">
                                {{ closeText || '关闭' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { ref, defineComponent, reactive, toRefs, computed } from "vue";
import { showToast } from 'vant';
import { CopyText } from '@/utils/copyText';

export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: "错误报告",
        },
        description: {
            type: String,
            default: "操作失败，请复制以下错误信息并反馈给开发人员",
        },
        error: {
            type: [String, Object, Error],
            default: "",
        },
        showRetryButton: {
            type: Boolean,
            default: false,
        },
        copyText: {
            type: String,
            default: "复制错误信息",
        },
        retryText: {
            type: String,
            default: "重试",
        },
        closeText: {
            type: String,
            default: "关闭",
        },
    },

    emits: {
        onClose: null,
        onRetry: null,
    },

    setup(props, context) {
        let tempData = Object.assign({}, props);
        const propsData = reactive(tempData);
        const copying = ref(false);

        // 格式化错误信息
        const formattedError = computed(() => {
            if (!propsData.error) return '未知错误';

            try {
                if (typeof propsData.error === 'string') {
                    return propsData.error;
                }

                if (propsData.error instanceof Error) {
                    return `${propsData.error.name}: ${propsData.error.message}\n${propsData.error.stack || ''}`;
                }

                if (typeof propsData.error === 'object') {
                    return JSON.stringify(propsData.error, null, 2);
                }

                return String(propsData.error);
            } catch (e) {
                return '错误信息格式化失败';
            }
        });

        // 复制错误信息
        const copyError = async () => {
            copying.value = true;
            try {
                const errorInfo = {
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    url: window.location.href,
                    walletAddress: localStorage.getItem('address') || 'Not connected',
                    error: formattedError.value,
                };

                const errorText = `=== 错误报告 ===\n时间: ${errorInfo.timestamp}\n页面: ${errorInfo.url}\n钱包地址: ${errorInfo.walletAddress}\n浏览器: ${errorInfo.userAgent}\n\n错误详情:\n${errorInfo.error}`;

                await CopyText(errorText);
            } catch (e) {
                showToast('复制失败，请重试');
            } finally {
                copying.value = false;
            }
        };

        const handleClose = () => {
            propsData.visible = false;
            context.emit("onClose");
        };

        const handleRetry = () => {
            context.emit("onRetry");
        };

        return {
            ...toRefs(propsData),
            copying,
            formattedError,
            copyError,
            handleClose,
            handleRetry,
        };
    },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.bg-popup-cover {
    background-color: rgba(0, 0, 0, 0.8);
}

.bg-gray-bottom {
    background-color: #1f2937;
}

.bg-gray-800 {
    background-color: #1f2937;
}

/* 滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
    width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: #374151;
    border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #6b7280;
    border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}
</style>
