<template>
  <div class="chart">
    <div class="poster-area">
      <AnimePoster class="poster" :data="data" />
    </div>
    <div class="scroll-area">
      <h2>{{ data.title }}</h2>
      <div class="meta">
        {{ data.episodes }} {{ data.episodes === 1 ? 'episode' : 'episodes'}}<br>
        ★ {{ data.score.toFixed(2) }}
      </div>
      <div class="studio">{{ data.studio }}</div>
      <div class="genre">{{ data.genre }}</div>
      <p class="description">{{ data.description }}</p>
    </div>
  </div>
</template>

<script>
import AnimePoster from './AnimePoster'

export default {
  name: 'AnimeChart',
  props: ['data'],
  components: {
    AnimePoster
  }
}
</script>

<style scoped>
.chart {
  margin: 7px 5px;
  border-radius: 3px;
  box-sizing: border-box;
  width: 100%;
  box-shadow: 0 6px 4px -4px rgba(0, 0, 0, 0.4), 0 0 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  display: flex;
  position: relative;
  font-size: 0.9em;
}

.poster-area {
  background: #333;
  overflow: hidden;
  width: 40%;
}

.scroll-area {
  overflow-y: auto;
  padding: 0 5px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 40%;
}

.poster {
  width: 100%;
  height: 100%;
}

/* avoid issues with large words */
h2 {
  word-break: break-word;
  font-size: 1.2em;
  margin: 0;
}

.meta {
  float: right;
  margin: 5px;
  padding: 0.1em 0.3em;
  color: white;
  background: #008CBA;
  border-radius: 5px;
  text-align: center;
}

.studio {
  font-weight: bold;
}

.genre {
  font-style: italic;
}

@media screen and (min-width: 700px)  {
  .chart {
    width: 48%;
    width: calc(50% - 10px);
  }
}

@media screen and (min-width: 1200px)  {
  .chart {
    width: 32%;
    width: calc(33.3% - 15px);
  }
}
</style>
