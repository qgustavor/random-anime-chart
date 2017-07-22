import createSentence from './createSentence'
import createTrope from './createTrope'
import createSetting from './createSetting'
import createMeta from './createMeta'
import createTitle from './createTitle'

export default function generateChart (random, names) {
  const chart = {
    id: random.hash({length: 15})
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

  chart.title = state.title.primary
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
  chart.malScore = state.meta.malScore
  chart.backgroundColor = 'hsl(' + [
    random.integer({min: 0, max: 360}),        // hue
    random.integer({min: 50, max: 100}) + '%', // saturation
    random.integer({min: 80, max: 90}) + '%'   // luminosity
  ].join(',') + ')'

  return chart
}
