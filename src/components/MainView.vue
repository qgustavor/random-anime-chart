<template>
  <div class="chart-area">
    <div v-if="missingLanguage" class="lang-alert">
      This language isn't supported yet.
    </div>

    <AnimeChart v-for="chart in charts" :data="chart" key="chart.id"></AnimeChart>

    <div v-if="!missingLanguage && !charts.length" class="loading-msg">
      Carregando...
    </div>

    <div v-if="missingLanguage && charts.length" class="lang-alert">
      This language isn't supported yet.
    </div>
  </div>
</template>

<script>
import AnimeChart from './AnimeChart'
import Chance from 'chance'
import createChart from '../procedural/createChart'
import { getLanguageData } from '../procedural/language-handler'

const CHART_COUNT = 12

export default {
  name: 'app',
  components: {
    AnimeChart
  },
  data () {
    return {
      charts: [],
      missingLanguage: false
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
      const language = this.$route.params.language || 'en'
      const newCharts = []

      this.charts = []
      this.missingLanguage = false

      getLanguageData(language).catch(() => {
        this.missingLanguage = true
        return getLanguageData('en')
      }).then(languageData => {
        for (let i = 0; i < CHART_COUNT; i++) {
          const chart = createChart(chance, languageData)
          newCharts.push(chart)
        }

        this.charts = newCharts
      })
    }
  }
}
</script>

<style scoped>
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

.studio {
  font-weight: bold;
}

.genre {
  font-style: italic;
}

.lang-alert, .loading-msg {
  background-color: white;
  border: 2px dashed orange;
  margin: 1em;
  padding: 1em;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.loading-msg {
  border-color: #008CBA;
}

@media screen and (min-width: 500px)  {
  .box {
    width: 50%;
    width: calc(50% - 10px);
  }
}

@media screen and (min-width: 700px)  {
  .box {
    width: 33.3%;
    width: calc(33.3% - 15px);
  }
}
</style>
