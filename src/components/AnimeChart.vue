<template>
  <div class="chart" :style="{
    backgroundColor: data.backgroundColor
  }">
    <!-- TODO: add image -->
    <h1>{{ data.title }}</h1>
    <div class="studio">{{ data.studio }}</div>
    <div class="genre">{{ data.genre }}</div>
    <p class="description">{{ data.description }}</p>
    <p class="score">{{ data.score }}</p>
  </div>
</template>

<script>
export default {
  name: 'AnimeChart',
  props: ['data']
}
</script>

<style scoped>
.chart {
  margin: 7px 5px;
  padding: 25px;
  padding-top: 5px;
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
  box-shadow: 0 6px 4px -4px rgba(0, 0, 0, 0.4), 0 0 8px rgba(0, 0, 0, 0.1);
}

/* avoid issues with large words */
h1 {
  word-break: break-word;
}

.studio {
  font-weight: bold;
}

.genre {
  font-style: italic;
}

@media screen and (min-width: 500px)  {
  .chart {
    width: 48%;
    width: calc(50% - 10px);
  }
}

@media screen and (min-width: 700px)  {
  .chart {
    width: 32%;
    width: calc(33.3% - 15px);
  }
}
</style>
