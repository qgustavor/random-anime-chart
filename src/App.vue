<template>
  <div id="app" v-if="lang">
    <header>
      <h1>{{ lang.interface.name }}</h1>
      <router-link to="random" class="btn">{{ lang.interface.reroll }}</router-link>
    </header>

    <div class="floating-header-padding" />

    <router-view :lang="lang"></router-view>

    <footer>
      <p><span v-for="part in lang.interface.footerParts">
        <a v-if="part.url" :href="part.url">{{ part.text }}</a>
        <span v-else>{{ part }}</span>
      </span></p>
      <p class="lang-select">
        <router-link v-for="(lang, code) in languageNames" :key="code"
          :to="'/' + (code === 'en' ? '' : code + '/') + $route.params.seed">
          {{ lang }}
        </router-link>
      </p>
    </footer>
  </div>
</template>

<script>
import { getLanguageData } from './lang/language-handler'
import languageNames from 'json-loader!yaml-loader!./lang/language-names.yaml'

export default {
  name: 'app',
  data () {
    return {
      lang: null,
      languageNames
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.params.language !== from.params.language) {
        this.getLanguageData()
      }
    }
  },
  mounted () {
    this.getLanguageData()
  },
  methods: {
    getLanguageData () {
      const language = this.$route.params.language || 'en'

      getLanguageData(language)
      .then(lang => {
        fixTag(lang.interface, 'footer')
        this.lang = lang
      }, () => {
        this.$router.replace('/' + this.$route.params.seed)
      })
    }
  }
}

function fixTag (obj, tagName) {
  const original = obj[tagName]
  const tokens = original.match(/\{[^}]+\}/g)
  const result = original.split(/\{[^}]+\}/g)
  tokens.forEach((token, index) => {
    const tokenName = token.replace(/^\{\s*|\s*\}$/g, '')
    const tagValues = obj[tokenName]
    result.splice(index * 2 + 1, 0, tagValues)
  })
  obj[tagName + 'Parts'] = result
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
