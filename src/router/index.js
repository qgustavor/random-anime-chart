import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/components/MainView'

import Chance from 'chance'
const chance = new Chance()

Vue.use(Router)

function toRandomChart (to) {
  const language = to.params.language
  if (language) {
    return '/' + language + '/' + chance.word({syllables: 3})
  }
  return '/' + chance.word({syllables: 3})
}

export default new Router({
  routes: [
    // Other routes may be added (like an about page)
    {
      name: 'Root',
      path: '/',
      redirect: '/random'
    },
    {
      name: 'Random',
      path: '/random',
      redirect: toRandomChart
    },
    {
      name: 'Chart',
      path: '/:seed',
      component: MainView
    },
    {
      name: 'TranslatedRandom',
      path: '/:language/random/',
      redirect: toRandomChart
    },
    {
      name: 'TranslatedChart',
      path: '/:language/:seed/',
      component: MainView
    }
  ]
})
