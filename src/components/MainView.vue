<template>
  <div class="chart-area">
    <AnimeChart v-for="chart in charts" :data="chart" key="chart.id"></AnimeChart>
  </div>
</template>

<script>
import AnimeChart from './AnimeChart'
import Chance from 'chance'
import createChart from '../procedural/createChart'

const CHART_COUNT = 12

export default {
  name: 'app',
  components: {
    AnimeChart
  },
  data () {
    return {
      charts: []
    }
  },
  watch: {
    '$route' (to, from) {
      this.generateCharts()
    }
  },
  mounted () {
    this.generateCharts()
  },
  methods: {
    generateCharts () {
      const chance = new Chance(this.$route.params.seed)
      const newCharts = []

      for (let i = 0; i < CHART_COUNT; i++) {
        const chart = createChart(chance)
        newCharts.push(chart)
      }

      this.charts = newCharts
    }
  }
}
</script>

<!-- HTML and body styles -->
<style>
body {
  margin: 0;
  background-color: #F4F4F4;
  /* I like medium font stack*/
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
}
</style>

<!-- App specific styles -->
<style scoped>
h1, h2 {
  margin: 0;
}

.chart-area {
  -js-display: flex;
	display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
}

.box {
  margin: 7px 5px;
  padding: 25px;
  padding-top: 5px;
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
  box-shadow: 0 6px 4px -4px rgba(0, 0, 0, 0.4), 0 0 8px rgba(0, 0, 0, 0.1);
}

header {
  text-align: center;
  width: 100%;
  background-color: #008CBA;
  color: #fff;
  position: fixed;
  box-shadow: 0 0 5px black;
  display: flex;
  align-items: center
}

header h1 {
  width: 100%;
  font-size: 1.25em;
}

.reroll-btn {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  font-size: 16px;
}

.reroll-btn:hover,
.reroll-btn:focus {
  background-color: #A5D7A7;
  outline: none;
}

.reroll-btn:active {
  background-color: #3BBE3E;
}

.studio {
  font-weight: bold;
}

.genre {
  font-style: italic;
}

footer {
  width: 100%;
  background-color: #008CBA;
  color: #fff;
  padding: 2em;
  box-sizing: border-box;
  text-align: center;
  margin-top: 1em;
}

footer a { color: white; }
footer a:hover,
footer a:focus { text-decoration: none; }

@media screen and (min-width: 500px)  {
  .box {
    width: 50%;
    width: calc(50% - 10px);
  }
  header h1 {
    font-size: 1.5em;
  }
}

@media screen and (min-width: 700px)  {
  .box {
    width: 33.3%;
    width: calc(33.3% - 15px);
  }
  header h1 {
    font-size: 1.75em;
  }
}
</style>
