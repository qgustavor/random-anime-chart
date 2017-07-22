const { capitalize, template, randomFilter } = require('./helpers')

export default function createTrope (state, type) {
  const {protagonist, secondaryCharacter, tertiaryCharacter, setting, meta, names, random} = state

  const {object, bodypart, group, occupationPlural, determiner, adjective, occupation,
  race, relation, verbPresentParticiple, verbPastParticiple, characterTrope,
  ownership, assessment, racePlural, groupSize, color,
  abstractConcept, verbToInfinitive, element} = names

  const wildcardSubject = [].concat(occupation, race, object, color)

  const templateFilters = {
    random: randomFilter(random),
    pickone: (arr) => random.pickone(arr),
    capitalize
  }

  if (type === 'protagonist') {
    makeBasicCharacter(random, names, protagonist)

    protagonist.bodypart = random.pickone(bodypart)
    protagonist.group = random.pickone(group)

    var occupationNumber = random.integer({min: 0, max: occupation.length - 1})
    protagonist.occupation = occupation[occupationNumber]
    protagonist.occupationPlural = occupationPlural[occupationNumber]
    protagonist.occupationDeterminer = random.pickone(determiner)

    protagonist.nickname = template(
      '{adjective | capitalize} {occupation | capitalize}',
      {...names, ...state},
      templateFilters
    )
    protagonist.object = random.pickone(object)
    protagonist.objectSecond = random.pickone(object)
    protagonist.verbPresentParticiple = random.pickone(verbPresentParticiple)
    protagonist.verbPastParticiple = random.pickone(verbPastParticiple)
    protagonist.characterTrope = random.pickone(characterTrope)
    protagonist.ability = template(
      '{object | capitalize} {object | capitalize}',
      {...names, ...state},
      templateFilters
    )
    protagonist.objectAdj = random.pickone(adjective)
    protagonist.objectRelation = random.pickone(ownership)
    protagonist.assessment = random.pickone(assessment)
    protagonist.allies = template(
      '{occupation | capitalize} {object | occupationPlural}',
      {...names, ...state},
      templateFilters
    )
    protagonist.threat = template(
      '{occupation | capitalize} {object | occupationPlural}',
      {...names, ...state},
      templateFilters
    )
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

    protagonist.goal = template(
      random.pickone(names.goalTemplates),
      {...names, ...state},
      templateFilters
    )

    protagonist.verbToInfinitive = random.pickone(verbToInfinitive)
    protagonist.element = random.pickone(element)
    protagonist.relationSek = random.pickone(relation)
    protagonist.relationTert = random.pickone(relation)

    setting.adjective = random.pickone(adjective)
    meta.PresentParticiple = random.pickone(verbPresentParticiple)
    meta.adjective = random.pickone(adjective)
  }

  if (type === 'secondaryCharacter') {
    makeBasicCharacter(random, names, secondaryCharacter)
    secondaryCharacter.adjective = random.pickone(adjective)
    secondaryCharacter.adjectiveSek = random.pickone(adjective)
  }

  if (type === 'tertiaryCharacter') {
    makeBasicCharacter(random, names, tertiaryCharacter)
  }
}

function makeBasicCharacter (random, names, character) {
  const {occupation, race, gender, lastName, relation} = names

  character.gender = random.pickone(gender)
  character.age = random.age({type: 'teen'})

  const genderData = names.genderData[character.gender]

  character.firstName = random.pickone(names.firstNames[character.gender])
  character.objectivePronoun = genderData.objectivePronoun
  character.genderPerfectTense = genderData.perfectTense
  character.pronoun = genderData.pronoun

  if (character.age > 19) {
    character.genderName = genderData.adultGenderName
  } else {
    character.genderName = genderData.youngGenderName
  }

  character.lastName = random.pickone(lastName)
  character.relation = random.pickone(relation)
  character.race = random.pickone(race)
  character.occupation = random.pickone(occupation)
}
