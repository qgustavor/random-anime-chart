var { capitalize } = require('./helpers')
var {occupation, race, object, color, gender,
firstNameMale, firstNameFemale, bodypart, lastName, group,
occupationPlural, determiner, adjective, relation,
verbPresentParticiple, verbPastParticiple, characterTrope,
ownership, assessement, racePlural, groupSize,
abstractConcept, verbToInfinitive, element} = require('./names')

module.exports = function createTrope (state, type) {
  const {protagonist, secondaryCharacter, tertiaryCharacter, setting, meta, random} = state

  var wildcardSubject = occupation.concat(race)
  wildcardSubject = wildcardSubject.concat(object)
  wildcardSubject = wildcardSubject.concat(color)

  if (type === 'protagonist') {
    protagonist.age = random.age({type: 'teen'})
    protagonist.gender = random.pickone(gender)

    if (protagonist.gender === 'male') {
      protagonist.firstName = random.pickone(firstNameMale)
      protagonist.objectivePronoun = 'his'
      protagonist.personalPronoun = 'him'

      if (protagonist.age > 19) {
        protagonist.genderName = 'man'
      } else {
        protagonist.genderName = 'boy'
      }

      protagonist.genderPerfectTense = "he's"
      protagonist.pronoun = 'he'
    } else {
      protagonist.firstName = random.pickone(firstNameFemale)
      protagonist.objectivePronoun = 'her'
      protagonist.personalPronoun = 'her'

      if (protagonist.age > 19) {
        protagonist.genderName = 'woman'
      } else {
        protagonist.genderName = 'girl'
      }
      protagonist.genderPerfectTense = "she's"
      protagonist.pronoun = 'she'
    }

    protagonist.bodypart = random.pickone(bodypart)
    protagonist.lastName = random.pickone(lastName)
    protagonist.race = random.pickone(race)
    protagonist.group = random.pickone(group)

    var occupationNumber = random.integer({min: 1, max: occupation.length}) - 1
    protagonist.occupation = occupation[occupationNumber]
    protagonist.occupationPlural = occupationPlural[occupationNumber]
    protagonist.occupationDeterminer = random.pickone(determiner)
    protagonist.nickname = capitalize(random.pickone(adjective)) + ' ' + capitalize(random.pickone(occupation))
    protagonist.object = random.pickone(object)
    protagonist.objectSecond = random.pickone(object)
    protagonist.verbPresentParticiple = random.pickone(verbPresentParticiple)
    protagonist.verbPastParticiple = random.pickone(verbPastParticiple)
    protagonist.characterTrope = random.pickone(characterTrope)
    protagonist.ability = capitalize(random.pickone(object)) + ' ' + capitalize(random.pickone(object))
    protagonist.objectAdj = random.pickone(adjective)
    protagonist.objectRelation = random.pickone(ownership)
    protagonist.assessement = random.pickone(assessement)
    protagonist.allies = capitalize(random.pickone(occupation)) + ' ' + capitalize(protagonist.occupationPlural)
    protagonist.threat = capitalize(random.pickone(occupation)) + ' ' + capitalize(random.pickone(occupationPlural))
    protagonist.threatRace = random.pickone(racePlural)
    protagonist.alliesRace = random.pickone(racePlural)
    protagonist.threadRaceSingular = random.pickone(race)
    protagonist.threatGroup = random.pickone(group)
    protagonist.threatGroupSize = random.pickone(groupSize)
    protagonist.threatAdjective = random.pickone(adjective)
    protagonist.adjective = random.pickone(adjective)
    protagonist.abstractConcept = random.pickone(abstractConcept)
    protagonist.color = random.pickone(color)
    setting.wildcardSubject = random.pickone(wildcardSubject)

    protagonist.goal = random.pickone([
      'be the best ' + protagonist.occupation,
      random.pickone(verbToInfinitive) + ' ' + protagonist.objectivePronoun +
      ' lost ' + random.pickone(relation)
    ])

    protagonist.verbToInfinitive = random.pickone(verbToInfinitive)
    protagonist.element = random.pickone(element)
    setting.adjective = random.pickone(adjective)
    meta.PresentParticiple = random.pickone(verbPresentParticiple)
    meta.adjective = random.pickone(adjective)
    protagonist.relationSek = random.pickone(relation)
    protagonist.relationTert = random.pickone(relation)
  }

  if (type === 'secondaryCharacter') {
    secondaryCharacter.gender = random.pickone(gender)
    secondaryCharacter.age = random.age({type: 'teen'})

    if (secondaryCharacter.gender === 'male') {
      secondaryCharacter.firstName = random.pickone(firstNameMale)
      secondaryCharacter.objectivePronoun = 'his'

      if (secondaryCharacter.age > 19) {
        secondaryCharacter.genderName = 'man'
      } else {
        secondaryCharacter.genderName = 'boy'
      }

      secondaryCharacter.genderPerfectTense = "he's"
      secondaryCharacter.pronoun = 'he'
    } else {
      secondaryCharacter.firstName = random.pickone(firstNameFemale)
      secondaryCharacter.objectivePronoun = 'her'

      if (secondaryCharacter.age > 19) {
        secondaryCharacter.genderName = 'woman'
      } else {
        secondaryCharacter.genderName = 'girl'
      }

      secondaryCharacter.genderPerfectTense = "she's"
      secondaryCharacter.pronoun = 'she'
    }
    secondaryCharacter.lastName = random.pickone(lastName)
    secondaryCharacter.relation = random.pickone(relation)
    secondaryCharacter.adjective = random.pickone(adjective)
    secondaryCharacter.adjectiveSek = random.pickone(adjective)
    secondaryCharacter.occupation = random.pickone(occupation)
  }

  if (type === 'tertiaryCharacter') {
    tertiaryCharacter.gender = random.pickone(gender)
    tertiaryCharacter.age = random.age({type: 'teen'})

    if (tertiaryCharacter.gender === 'male') {
      tertiaryCharacter.firstName = random.pickone(firstNameMale)
      tertiaryCharacter.objectivePronoun = 'his'

      if (tertiaryCharacter.age > 19) {
        tertiaryCharacter.genderName = 'man'
      } else {
        tertiaryCharacter.genderName = 'boy'
      }

      tertiaryCharacter.genderPerfectTense = "he's"
      tertiaryCharacter.pronoun = 'he'
    } else {
      tertiaryCharacter.firstName = random.pickone(firstNameFemale)
      tertiaryCharacter.objectivePronoun = 'her'

      if (tertiaryCharacter.age > 19) {
        tertiaryCharacter.genderName = 'woman'
      } else {
        tertiaryCharacter.genderName = 'girl'
      }
      tertiaryCharacter.genderPerfectTense = "she's"
      tertiaryCharacter.pronoun = 'she'
    }

    tertiaryCharacter.lastName = random.pickone(lastName)
    tertiaryCharacter.relation = random.pickone(relation)
    tertiaryCharacter.race = random.pickone(race)
    tertiaryCharacter.occupation = random.pickone(occupation)
  }
}
