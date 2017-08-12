<template>
  <div id="app">
    <header>
      <h1>Random Anime Chart</h1>
      <router-link to="random" class="btn">Reroll</router-link>
    </header>

    <div class="floating-header-padding" />

    <router-view></router-view>

    <footer>
      <p>Based on <a href="http://animedreammachine.com/">animedreammachine.com</a> |
      Check the <a href="https://github.com/qgustavor/random-anime-chart">source code at GitHub</a></p>
      <p class="lang-select">
        <router-link :to="'/'    + $route.params.seed">English</router-link>
        <router-link :to="'/pt/' + $route.params.seed">Português</router-link>
        <router-link :to="'/de/' + $route.params.seed">Deutsch</router-link>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
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

header {
  text-align: center;
  width: 100%;
  background-color: #008CBA;
  color: #fff;
  position: fixed;
  box-shadow: 0 0 5px black;
  display: flex;
  align-items: center;
  z-index: 1;
}

header h1 {
  width: 100%;
  font-size: 1.25em;
}

.floating-header-padding {
  padding-top: 60px;
}

.btn {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  font-size: 16px;
  text-decoration: none;
}

.btn:hover,
.btn:focus {
  background-color: #A5D7A7;
  outline: none;
}

.btn:active {
  background-color: #3BBE3E;
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

.lang-select a {
  margin: 0 0.5em 0.5em;
  padding: 0.2em 0.6em;
  border: 1px solid white;
  text-decoration: none;
  display: inline-block;
}

.lang-select .router-link-exact-active {
  background-color: white;
  color: #008CBA;
}

@media screen and (min-width: 500px)  {
  header h1 {
    font-size: 1.5em;
  }
}

@media screen and (min-width: 700px)  {
  header h1 {
    font-size: 1.75em;
  }
}
</style>
