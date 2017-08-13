<template>
  <canvas />
</template>

<script>
/* global convnetjs */
import network from './poster-network.json'

// https://websitesetup.org/web-safe-fonts-html-css/
const websafeFonts = [
  'Arial',
  'Helvetica',
  'Verdana',
  'Bookman',
  'Trebuchet MS',
  'Arial Black',
  'Impact'
]

const generateTitle = (ctx, random, data) => {
  const font = random.pickone(websafeFonts)
  const lineWidth = random.integer({min: 5, max: 9})
  ctx.lineWidth = lineWidth
  ctx.miterLimit = 2

  const darkText = random.bool({probality: 20})
  ctx.fillStyle = darkText ? 'black' : 'white'
  ctx.strokeStyle = darkText ? 'white' : 'black'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const posX = random.integer({min: 110, max: 120})
  const posY = random.bool({probality: 80})
  ? random.integer({min: 250, max: 285}) // down
  : random.bool({probality: 60})
  ? random.integer({min: 50, max: 100}) // above
  : 164 // middle

  const doRotation = random.bool({probality: 30})
  if (doRotation) {
    ctx.save()
    ctx.rotate(random.floating({min: -0.02, max: 0.02}))
  }

  if (data.subtitle) {
    const sizeFirst = random.integer({min: 30, max: 40})
    const sizeSecond = random.integer({min: 20, max: 30})
    const yDelta = sizeFirst / 2

    ctx.font = sizeFirst + 'px ' + font
    ctx.strokeText(data.titleBasic, posX, posY - yDelta, 200)
    ctx.fillText(data.titleBasic, posX, posY - yDelta, 200)

    ctx.font = sizeSecond + 'px ' + font
    ctx.strokeText(data.subtitle, posX, posY + yDelta, 200)
    ctx.fillText(data.subtitle, posX, posY + yDelta, 200)
  } else {
    const size = random.integer({min: 20, max: 50})
    ctx.font = size + 'px ' + font
    ctx.strokeText(data.title, posX, posY, 200)
    ctx.fillText(data.title, posX, posY, 200)
  }

  if (doRotation) ctx.restore()
}

function sharpen (ctx, w, h, mix, a) {
  // note: for some weird reason declaring "a" in the let below makes ESLint
  // throw a no-unused-vars error, in the other hand not declaring it makes
  // it throw a no-undef error, so to fix this weird bug this variable got
  // declared in the function arguments
  let x, sx, sy, r, g, b, dstOff, srcOff, wt, cx, cy, scy, scx
  let weights = [0, -1, 0, -1, 5, -1, 0, -1, 0]
  let katet = Math.round(Math.sqrt(weights.length))
  let half = (katet * 0.5) | 0
  let dstData = ctx.createImageData(w, h)
  let dstBuff = dstData.data
  let srcBuff = ctx.getImageData(0, 0, w, h).data
  let y = h

  while (y--) {
    x = w
    while (x--) {
      sy = y
      sx = x
      dstOff = (y * w + x) * 4
      r = 0
      g = 0
      b = 0
      a = 0

      for (cy = 0; cy < katet; cy++) {
        for (cx = 0; cx < katet; cx++) {
          scy = sy + cy - half
          scx = sx + cx - half

          if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
            srcOff = (scy * w + scx) * 4
            wt = weights[cy * katet + cx]

            r += srcBuff[srcOff] * wt
            g += srcBuff[srcOff + 1] * wt
            b += srcBuff[srcOff + 2] * wt
            a += srcBuff[srcOff + 3] * wt
          }
        }
      }

      dstBuff[dstOff] = r * mix + srcBuff[dstOff] * (1 - mix)
      dstBuff[dstOff + 1] = g * mix + srcBuff[dstOff + 1] * (1 - mix)
      dstBuff[dstOff + 2] = b * mix + srcBuff[dstOff + 2] * (1 - mix)
      dstBuff[dstOff + 3] = srcBuff[dstOff + 3]
    }
  }

  ctx.putImageData(dstData, 0, 0)
}

let scheduledPosters = []
let currentKey

export default {
  name: 'AnimePoster',
  props: ['data'],
  mounted () {
    this.generatePosterSchedule()
  },
  watch: {
    '$route' (to, from) {
      const scheduleKey = to.params.seed + '_' + to.params.language
      if (scheduleKey !== currentKey) {
        currentKey = scheduleKey
        scheduledPosters = []
      }
    },
    data () {
      this.generatePosterSchedule()
    }
  },
  methods: {
    generatePosterSchedule () {
      const canvas = this.$el
      // Those are the AniList poster dimensions
      canvas.width = 230
      canvas.height = 325

      if (scheduledPosters.length === 0) {
        setTimeout(this.generatePosterTimeout, 100)
      }

      scheduledPosters.push(() => {
        this.generatePoster()
      })
    },
    generatePosterTimeout () {
      const posterFn = scheduledPosters.shift()
      if (posterFn) {
        posterFn()
        setTimeout(this.generatePosterTimeout, 1000)
      }
    },
    generatePoster () {
      const canvas = this.$el
      const data = this.data
      const random = data.random
      const ctx = canvas.getContext('2d')

      // Those are the MyAnimeList small poster dimensions
      const tempCanvas = document.createElement('canvas')
      const W = tempCanvas.width = 50
      const H = tempCanvas.height = 70
      const tempCtx = tempCanvas.getContext('2d')

      // Neural network related info
      const imageCount = 20
      const bg = tempCtx.getImageData(0, 0, W, H)
      const v = new convnetjs.Vol(1, 1, 2 + imageCount)
      const net = new convnetjs.Net()
      net.fromJSON(network)

      // Set image weights
      const mainImage = random.integer({min: 0, max: imageCount - 1})
      const secondImage = random.integer({min: 0, max: imageCount - 1})
      for (let i = 0; i < imageCount; i++) {
        v.w[2 + i] = mainImage === secondImage
        ? random.floating({min: 0, max: 1})
        : i === mainImage
        ? random.floating({min: 0.5, max: 1})
        : i === secondImage
        ? random.floating({min: 0, max: 0.5})
        : 0
      }

      // Normalize heights
      const heightSum = v.w.slice(2).reduce((sum, element) => sum + element, 0)
      for (let i = 0; i < imageCount; i++) {
        v.w[2 + i] /= heightSum
      }

      // Draw background from neural network
      for (let x = 0; x < W; x++) {
        v.w[0] = (x - W / 2) / W
        for (let y = 0; y < H; y++) {
          v.w[1] = (y - H / 2) / H

          const ix = ((W * y) + x) * 4
          const r = net.forward(v)
          bg.data[ix + 0] = Math.floor(255 * r.w[0])
          bg.data[ix + 1] = Math.floor(255 * r.w[1])
          bg.data[ix + 2] = Math.floor(255 * r.w[2])
          bg.data[ix + 3] = 255
        }
      }

      // Update canvas
      tempCtx.putImageData(bg, 0, 0)
      sharpen(tempCtx, W, H, random.floating({min: 0.1, max: 0.7}))
      ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height)

      // Draw title
      generateTitle(ctx, random, data)
    }
  }
}
</script>
