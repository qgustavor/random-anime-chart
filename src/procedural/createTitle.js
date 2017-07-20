var { capitalize } = require('./helpers')
var {object, adjectiveComparative, measures, specialCharacters, suffixes, preposition} = require('./names')

module.exports = function createTitle (state) {
  var { setting, protagonist, meta, secondaryCharacter, title, random } = state

  var titlePool = [
    setting.place + ' ' + protagonist.firstName,
    protagonist.firstName,
    setting.place + ' ' + capitalize(protagonist.occupation),
    capitalize(setting.location) + ' Crisis',
    'The ' + capitalize(protagonist.occupationDeterminer) + ' ' + capitalize(protagonist.occupation),
    capitalize(protagonist.occupation) + ' in another ' + capitalize(setting.locationPlace),
    'My ' + capitalize(protagonist.occupation) + ' Academia',
    protagonist.firstName + ' the ' + capitalize(protagonist.adjective) + ' ' + capitalize(protagonist.occupation),
    protagonist.threat,
    protagonist.nickname,
    capitalize(setting.location) + ' of the ' + capitalize(protagonist.threat),
    capitalize(protagonist.color) + ' ' + capitalize(protagonist.occupation),
    'Legend of the ' + capitalize(protagonist.adjective) + ' ' + capitalize(protagonist.occupation) + 's',
    'The ' + capitalize(protagonist.objectRelation) + ' of ' + capitalize(protagonist.occupation),
    capitalize(protagonist.occupation) + ' ' + capitalize(protagonist.genderName) + 's',
    capitalize(setting.adjective) + ' ' + capitalize(setting.location),
    protagonist.firstName + '-' + random.pickone(suffixes),
    capitalize(protagonist.occupation) + ' ' + 'Beats',
    capitalize(meta.PresentParticiple),
    capitalize(protagonist.occupation),
    capitalize(protagonist.allies) + ' versus ' + capitalize(protagonist.threat),
    'My ' + capitalize(secondaryCharacter.adjectiveSek) + ' ' + capitalize(secondaryCharacter.relation) +
    " can't be that " + capitalize(secondaryCharacter.adjective),
    'A Certain ' + capitalize(protagonist.adjective) + ' ' + capitalize(protagonist.occupation),
    protagonist.firstName + ' ' + random.pickone(preposition) + ' the ' +
    capitalize(setting.location),
    capitalize(meta.adjective) + ' ' + capitalize(protagonist.object),
    capitalize(protagonist.occupation) + ' x ' + capitalize(protagonist.occupation),
    protagonist.firstName + ' of the ' + capitalize(setting.timeOfDay),
    capitalize(setting.catastropheSpice) + ' ' + capitalize(setting.catastrophe),
    capitalize(setting.catastropheSpice),
    protagonist.firstName + ' the ' + capitalize(protagonist.adjective),
    capitalize(setting.wildcardSubject),
    protagonist.firstName + ' to ' + secondaryCharacter.firstName,
    capitalize(protagonist.object) + ' ' + capitalize(protagonist.genderName),
    capitalize(setting.wildcardSubject) + ' in the ' + capitalize(protagonist.object),
    capitalize(protagonist.object) + ' of the ' + capitalize(protagonist.occupation),
    capitalize(protagonist.threatRace) + ' and ' + capitalize(setting.wildcardSubject),
    capitalize(setting.wildcardSubject) + '-Blooded ' + capitalize(protagonist.occupationPlural),
    random.integer({min: 1, max: 100}) + ' ' + capitalize(random.pickone(measures)) + ' per ' + capitalize(setting.timespan),
    capitalize(protagonist.occupation) + ' of the ' + capitalize(protagonist.threatRace),
    // "When They Cry",
    capitalize(protagonist.color) + ' ' + capitalize(setting.location),
    'The ' + capitalize(setting.wildcardSubject) + ' of a ' + capitalize(protagonist.threatRace) + ' ' + capitalize(setting.location),
    capitalize(setting.location) + ' of ' + capitalize(protagonist.threat),
    protagonist.firstName + ' on ' + capitalize(protagonist.element),
    capitalize(meta.adjective) + ' ' + capitalize(protagonist.allies),
    'To Be ' + capitalize(protagonist.occupation),
    capitalize(protagonist.adjective) + '-Eyed' + ' ' + protagonist.firstName,
    capitalize(random.pickone(object)) + '/' + capitalize(random.pickone(object)) + ' ' + capitalize(random.pickone(object)),
    capitalize(setting.location) + ' ' + capitalize(setting.timespan) + 's',
    capitalize(protagonist.race) + ' ' + capitalize(protagonist.occupation),
    capitalize(protagonist.adjective) + ' ' + capitalize(protagonist.occupation),
    protagonist.firstName + ' Wants to be ' + capitalize(protagonist.verbPastParticiple),
    'All you need is ' + capitalize(protagonist.verbToInfinitive),
    capitalize(random.pickone(adjectiveComparative)) + ' Than ' +
    capitalize(setting.wildcardSubject)
  ]
  title.primary = random.pickone(titlePool)

  var titleSubtitle = [
    'The ' + capitalize(setting.countryStateform) + ' of ' + capitalize(protagonist.object),
    capitalize(protagonist.objectAdj) + ' ' + capitalize(protagonist.object),
    capitalize(random.pickone(object)),
    protagonist.firstName + ' of the ' + capitalize(random.pickone(object)),
    capitalize(protagonist.threatRace) + ' ' + capitalize(protagonist.occupation),
    capitalize(random.pickone(object)) + setting.catastrophe + ' Dance',
    capitalize(protagonist.verbPresentParticiple) + ' with ' + protagonist.firstName,
    capitalize(protagonist.occupationPlural) + ' of the ' + capitalize(setting.timeOfDay) + ' ' + capitalize(setting.location),
    'Second Season'
  ]
  title.subtitle = random.pickone(titleSubtitle)

  if (random.bool({likelihood: 80})) {
    var characters = specialCharacters.map(e => e[0])
    var weights = specialCharacters.map(e => e[1])
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
