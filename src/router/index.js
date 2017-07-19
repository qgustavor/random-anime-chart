import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/components/MainView'

import Chance from 'chance'
const chance = new Chance()

Vue.use(Router)

function toRandomChart (to) {
  return chance.word({syllables: 3})
}

export default new Router({
  routes: [
    // Other routes may be added (like an about page)
    {
      name: 'Root',
      path: '/',
      redirect: toRandomChart
    },
    {
      name: 'Chart',
      path: '/:seed',
      component: MainView
    },
    {
      name: 'TranslatedChart',
      path: '/:language/:seed/',
      component: MainView
    }
  ]
})
