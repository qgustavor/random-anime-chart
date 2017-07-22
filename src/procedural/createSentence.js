var { capitalize, indefiniteArticle, template, randomFilter } = require('./helpers')

export default function createSentence (state, type) {
  const { random, protagonist, meta, setting, names } = state

  const templateFilters = {
    random: randomFilter(random),
    pickone: (arr) => random.pickone(arr),
    indefiniteArticle,
    capitalize
  }

  const protagonistName = random.pickone([
    protagonist.firstName,
    protagonist.firstName + ' ' + protagonist.lastName
  ])

  let result

  if (type === 'first') {
    // One character, two characters and setting
    var structuresOne = names.sentenceFirst.oneCharacter
    var structuresTwo = names.sentenceFirst.twoCharacters
    var structuresSetting = names.sentenceFirst.setting

    var firstSentencePool = structuresOne.length + structuresTwo.length + structuresSetting.length

    meta.firstSentenceRelation = random.integer({min: 1, max: firstSentencePool})
    if (meta.firstSentenceRelation <= structuresOne.length) {
      result = random.pickone(structuresOne)
      meta.firstSentenceRelationLog = 1
    } else if (meta.firstSentenceRelation > structuresOne.length && meta.firstSentenceRelation <= structuresTwo.length) {
      result = random.pickone(structuresTwo)
      meta.firstSentenceRelationLog = 2
    } else {
      result = random.pickone(structuresSetting)
      meta.firstSentenceRelationLog = 3
    }

    result = template(
      result,
      {protagonistName, ...names, ...state},
      templateFilters
    )

    meta.sentences = 1
    return result
  }

  if (type === 'mid') {
    var merge = meta.firstSentenceRelationLog === 1
    // One Character
    ? names.sentenceMid.oneCharacter
    : meta.firstSentenceRelationLog === 2
    // Group
    ? names.sentenceMid.twoCharacters
    // Setting
    : names.sentenceMid.setting

    // Merge neutral 'structures' with merge
    var structures = names.sentenceMid.structures
    structures = merge.concat(structures)

    result = random.pickone(structures.filter(function (element, index) {
      return index !== setting.structureTaken
    }))

    setting.structureTaken = structures.indexOf(result)

    meta.sentence = meta.sentence + 1

    result = template(
      result,
      {protagonistName, ...names, ...state},
      templateFilters
    )

    return result
  }

  if (type === 'last') {
    result = template(
      random.pickone(names.sentenceMid.structures),
      {protagonistName, ...names, ...state},
      templateFilters
    )

    return result
  }
}
