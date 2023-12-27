<template>
  <div class="bg-black h-screen relative">
    <div class="w-full top-2 left-0 z-40 shadow-xl sticky" v-if="route.meta.showLogo">
      <top-bar :pageTitle="pageTitle" showLogo></top-bar>
    </div>
    <div class="fixed bg-black w-full top-0 left-0 z-40 shadow-xl" v-if="route.meta.showBack">
      <top-back-bar :pageTitle="route.meta.pageTitle" />
    </div>
    <div class="fixed bg-black w-full top-0 left-0 z-40 shadow-xl" v-if="route.meta.showGOIndex">
      <top-back-home :pageTitle="route.meta.pageTitle" />
    </div>
    <div class="">
      <router-view class="relative z-10" />
      <div ref="container" class="container relative" style="border: 1px solid black;">

        <canvas id="canvas" class="w-screen h-screen fixed left-0 top-0" ref="canvas" />
        <div class="w-screen h-screen fixed left-0 top-0 bg-black opacity-50" />
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRoute } from "vue-router"

const route = useRoute()
// let Star = ref({
//   orbitRadius: number,
//   radius: number, //星星大小
//   orbitX: number,
//   orbitY: number,
//   timePassed: number,
//   speed: number, //星星移动速度
//   alpha: number
// })
import TopBar from '@/components/TopBar.vue'
import TopBackBar from './components/TopBackBar.vue'
import TopBackHome from './components/TopBackHome.vue'


const container = ref()
const canvas = ref()
const ctx = ref()

const w = ref(1000)
const h = ref(800)
const hue = 217,
  stars = ref([]),
  maxStars = 1300

const canvas2 = ref()
const ctx2 = ref()

const half = ref(0)
const gradient2 = ref()


const random = (min, max) => {
  if (!max) {
    max = min
    min = 0
  }

  if (min > max) {
    let hold = max
    max = min
    min = hold
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 计算星星移动范围
 * @param x
 * @param y
 */
const maxOrbit = (x, y) => {
  const max = Math.max(x, y),
    diameter = Math.round(Math.sqrt(max * max + max * max))
  return diameter / 2
  //星星移动范围，值越大范围越小，
}

/**
 * 绘制星星
 */
const drawStar = (ctx, star) => {
  const x = Math.sin(star.timePassed) * star.orbitRadius + star.orbitX,
    y = Math.cos(star.timePassed) * star.orbitRadius + star.orbitY,
    twinkle = random(10)

  if (twinkle === 1 && star.alpha > 0) {
    star.alpha -= 0.05
  } else if (twinkle === 2 && star.alpha < 1) {
    star.alpha += 0.05
  }

  ctx.globalAlpha = star.alpha
  ctx.drawImage(canvas2.value, x - star.radius / 2, y - star.radius / 2, star.radius, star.radius)
  star.timePassed += star.speed
}

/**
 * 星星的旋转动画
 */
const animation = () => {
  ctx.value.globalCompositeOperation = 'source-over'
  ctx.value.globalAlpha = 0.5 //尾巴
  ctx.value.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)'
  ctx.value.fillRect(0, 0, w.value, h.value)

  ctx.value.globalCompositeOperation = 'lighter'
  for (let i = 1, l = stars.value.length; i < l; i++) {
    drawStar(ctx.value, stars.value[i])
  }

  window.requestAnimationFrame(animation)
}

/**
 * 产生星星
 */
const generateStar = () => {
  const orbitRadius = random(maxOrbit(w.value, h.value))
  // 星星大小
  const radius = random(60, orbitRadius) / 8
  const orbitX = w.value / 2
  const orbitY = h.value / 2
  const timePassed = random(0, maxStars)
  // 星星移动速度
  const speed = random(orbitRadius) / 50000
  const alpha = random(2, 10) / 10
  const star = {
    orbitX,
    orbitY,
    orbitRadius,
    radius,
    timePassed,
    speed,
    alpha
  }
  return star
}

/**
 * 初始化星星的数量
 */
const initStar = () => {
  ctx.value = canvas.value.getContext('2d')
  w.value = container.value?.clientWidth
  h.value = container.value?.clientHeight
  canvas.value.width = container.value?.clientWidth || 1000
  canvas.value.height = container.value?.clientHeight || 800
  console.log(`画布的宽高是: ${w.value} ======== ${h.value}`)
  canvas2.value = document.createElement('canvas')
  ctx2.value = canvas2.value.getContext('2d')
  canvas2.value.width = 100
  canvas2.value.height = 100
  half.value = canvas2.value.width / 2
  gradient2.value = ctx2.value.createRadialGradient(half.value, half.value, 0, half.value, half.value, half.value)
  gradient2.value.addColorStop(0.025, '#CCC')
  gradient2.value.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)')
  gradient2.value.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)')
  gradient2.value.addColorStop(1, 'transparent')
  ctx2.value.fillStyle = gradient2.value
  ctx2.value.beginPath()
  ctx2.value.arc(half.value, half.value, half.value, 0, Math.PI * 2)
  ctx2.value.fill()
  for (let i = 0; i < maxStars; i++) {
    const star = generateStar()
    stars.value.push(star)
  }
  console.log(stars.value)
}


const { proxy } = getCurrentInstance()
onMounted(() => {
  initStar()
  animation()
  accountHasChanged()
})
async function accountHasChanged() {
  window.ethereum.on('accountsChanged', (accounts) => {
    proxy.$confirm.hide()
    proxy.$confirm.show({
      title: '賬戶發生變化',
      content: '當前賬戶發生變化，請重新登錄',
      showCancelButton: false,
      confirmText: '確定',
      onConfirm: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('address')
        location.reload()
      },
    })
  })
}
//钱包地址签名
// async function addressSign() {
//     proxy.$loading.show()
//     const web3 = new Web3(window.ethereum)
//     let params = {}
//     const randomString =
//         "Welcome to Minter\n\nPlease click to sign in and accept the Minter Terms of Service.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n" +
//         window.ethereum.selectedAddress +
//         "\n\nNonece:\n" +
//         generateNonce()
//     try {
//         const signature = await web3.eth.personal.sign(randomString, window.ethereum.selectedAddress, '')
//         params = { randomString: randomString, signature: signature }
//     } catch (err) {
//         proxy.$loading.hide()
//         showToast('签名失败，请重试')
//         return
//     }


//     login(params)
//         .then(res => {
//             console.log(res)
//             localStorage.setItem('token', res.access_token)
//             localStorage.setItem('address', res.address)
//             userInfo.changeAddress(res.address)
//             proxy.$loading.hide()
//             // showToast('已登录')
//         })
//         .catch(err => {
//             proxy.$loading.hide()
//             showToast('登录失败，请重试')
//             console.log(err)
//         })
//     // console.log(signature)

// }
</script>

<style  scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

#canvas {
  width: 100%;
  height: 100%;
}
</style>