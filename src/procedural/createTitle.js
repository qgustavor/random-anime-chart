const { capitalize, template, randomFilter } = require('./helpers')

export default function createTitle (state) {
  const { title, random, names } = state
  const templateFilters = {
    random: randomFilter(random),
    pickone: (arr) => random.pickone(arr),
    capitalize
  }

  const titlePool = names.titleTemplates
  title.primary = template(
    random.pickone(titlePool),
    {...state, ...names},
    templateFilters
  )

  var titleSubtitle = names.subtitleTemplates
  title.subtitle = template(
    random.pickone(titleSubtitle),
    {...state, ...names},
    templateFilters
  )

  if (random.bool({likelihood: 80})) {
    var characters = names.specialCharacters.map(e => e[0])
    var weights = names.specialCharacters.map(e => e[1])
    title.primary = title.primary + random.weighted(characters, weights)
  }

  if (random.bool({likelihood: 90})) {
    var version = random.integer({min: 1, max: 3})
    if (random.integer({min: 1, max: 2}) === 1) {
      if (version === 1) {
        version = 0
      }
      title.primary = title.primary + ' ' + version
    } else {
      var versionTemp = ''
      for (var i = 0; i < version; i++) {
        versionTemp = versionTemp + 'I'
      }
      title.primary = title.primary + ' ' + versionTemp
    }
  }

  if (random.bool({likelihood: 85})) {
    title.full = title.primary + ': ' + title.subtitle
  } else {
    title.full = title.primary
    title.subtitle = null
  }
}
