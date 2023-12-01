import { showToast } from 'vant'
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()
export async function CopyText(text) {
  try {
    await toClipboard(text)
    showToast('复制成功')
  } catch (e) {
    showToast('复制失败，请重试')

    console.error(e)
  }
}
