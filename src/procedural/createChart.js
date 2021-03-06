import createSentence from './createSentence'
import createTrope from './createTrope'
import createSetting from './createSetting'
import createMeta from './createMeta'
import createTitle from './createTitle'

export default function generateChart (random, names) {
  const chart = {
    id: random.hash({length: 15}),
    random
  }
  const state = {
    structureTaken: 'x',
    protagonist: {},
    secondaryCharacter: {},
    tertiaryCharacter: {},
    setting: {},
    title: {},
    meta: {},
    random,
    names
  }

  createTrope(state, 'protagonist')
  createTrope(state, 'secondaryCharacter')
  createTrope(state, 'tertiaryCharacter')
  createSetting(state)
  createMeta(state)
  createTitle(state)

  chart.title = state.title.full
  chart.titleBasic = state.title.primary
  chart.subtitle = state.title.subtitle
  chart.studio = state.meta.studio
  chart.genre = state.meta.genre

  // Chance of 1-3 second sentences
  let description = createSentence(state, 'first') + '. '
  const count = random.integer({min: 1, max: 3})
  for (var j = 0; j < count; j++) {
    description += createSentence(state, 'mid') + '. '
  }
  description += ' ' + createSentence(state, 'last')

  chart.description = description
  chart.episodes = random.integer(random.weighted([
    {min: 1, max: 5},
    {min: 10, max: 14},
    {min: 22, max: 26},
    {min: 50, max: 60},
    {min: 100, max: 200}
  ], [10, 30, 20, 5, 1]))
  chart.score = state.meta.malScore

  return chart
}
