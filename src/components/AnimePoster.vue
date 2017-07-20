<template>
  <canvas />
</template>

<script>
const backgroundTypes = [
  (ctx, random) => {
    // Plain background
    ctx.fillStyle = random.color({format: 'rgb'})
    ctx.fillRect(0, 0, 230, 325)
  },
  (ctx, random) => {
    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 230, 325)
    gradient.addColorStop(0, random.color({format: 'rgb'}))
    gradient.addColorStop(1, random.color({format: 'rgb'}))
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 230, 325)
  },
  (ctx, random) => {
    // Random sky
    const gradient = ctx.createLinearGradient(0, 0, 0, 325)
    const hue1 = random.integer({min: 200, max: 260})
    const hue2 = random.integer({min: 200, max: 260})

    gradient.addColorStop(0, `hsl(${hue1}, 60%, 50%)`)
    gradient.addColorStop(1, `hsl(${hue2}, 40%, 50%)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 230, 325)
  }
]

// https://websitesetup.org/web-safe-fonts-html-css/
const websafeFonts = [
  'Arial',
  'Helvetica',
  // no times
  // no courier
  'Verdana',
  // no georgia
  // no palatino
  // no garamond
  'Bookman',
  // no comic sans here
  'Trebuchet MS',
  'Arial Black',
  'Impact'
]

const titleTypes = [
  (ctx, random, data) => {
    const font = random.pickone(websafeFonts)
    const lineWidth = random.integer({min: 0, max: 9})
    ctx.lineWidth = lineWidth
    ctx.miterLimit = 2

    const darkText = random.bool({probality: 20})
    ctx.fillStyle = darkText ? 'black' : 'white'
    ctx.strokeStyle = lineWidth < 5 ? 'transparent'
      : darkText ? 'white' : 'black'
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
]

export default {
  name: 'AnimePoster',
  props: ['data'],
  mounted () {
    this.generatePoster()
  },
  watch: {
    data () {
      this.generatePoster()
    }
  },
  methods: {
    generatePoster () {
      const canvas = this.$el
      const data = this.data
      const random = data.random

      // Those are the AniList poster dimensions
      canvas.width = 230
      canvas.height = 325

      const ctx = canvas.getContext('2d')

      random.pickone(backgroundTypes)(ctx, random)
      random.pickone(titleTypes)(ctx, random, data)
    }
  }
}
</script>
