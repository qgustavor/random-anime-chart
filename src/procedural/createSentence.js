var { capitalize, indefiniteArticle } = require('./helpers')
var {occupationPlural} = require('./names')

module.exports = function createSentence (state, type) {
  var { random, protagonist, setting, secondaryCharacter, tertiaryCharacter, title, meta } = state

  var protagonistName = random.pickone([
    protagonist.firstName,
    protagonist.firstName + ' ' + protagonist.lastName
  ])

  var result

  if (type === 'first') {
    // One character
    var structuresOne = [
      protagonistName + ' is a ' + protagonist.age + ' year old ' + protagonist.occupation,
      protagonistName + ' is the ' + protagonist.occupationDeterminer + ' ' + protagonist.occupation,
      'The story centers around ' + protagonistName + ', the last ' + protagonist.occupation,
      protagonistName + ' lives in the ' + setting.location + ' and is ' + protagonist.assessement + ' at ' + protagonist.verbPresentParticiple,
      protagonistName + ' is the ' + protagonist.objectRelation + ' of the ' + protagonist.objectAdj + ' ' + protagonist.object,
      protagonistName + ' wants to ' + protagonist.goal + ' in ' + setting.place,
      protagonistName + " isn't your typical " + protagonist.occupation,
      protagonistName + ' is a seemingly ' + protagonist.adjective + ' ' + protagonist.genderName + ' living with ' + protagonist.objectivePronoun + ' ' + secondaryCharacter.relation + ' in a ' + setting.location,
      protagonistName + ' inherits ' + indefiniteArticle(protagonist.object) + ' from ' + protagonist.objectivePronoun + ' ' + secondaryCharacter.relation,
      protagonistName + ', ' + indefiniteArticle(protagonist.occupation),
      'A heartwarming story about ' + indefiniteArticle(protagonist.occupation) + ', who was given ' + indefiniteArticle(protagonist.object) +
      ' from ' + indefiniteArticle(tertiaryCharacter.race),
      protagonistName + ' is ' + indefiniteArticle(protagonist.characterTrope) + " who's not especially " + protagonist.assessement + ' at anything in particular',
      protagonistName + ' possesses the ' + protagonist.ability + ' ability, but it is not strong enough to make ' + protagonist.personalPronoun + ' particularly important',
      protagonistName + ' is ' + indefiniteArticle(protagonist.adjective) + ' ' + protagonist.age + ' year-old ' + protagonist.genderName + ' who lives near the ' +
      setting.locationNature + ' and ' + protagonist.pronoun + ' spends much of ' + protagonist.objectivePronoun + ' time ' + protagonist.verbPresentParticiple + ' as a result',
      "The show's story revolves around " + protagonistName + ', who carried all of ' + setting.country + "'s hopes on " + protagonist.objectivePronoun + ' shoulders to win at the Grand Prix Finale ' +
      capitalize(protagonist.occupation) + ' competition, but suffered a crushing defeat',
      protagonistName + ' is ' + indefiniteArticle(protagonist.adjective) + ' ' + protagonist.genderName + ' with a ' + indefiniteArticle(protagonist.adjective) + ' ' + protagonist.bodypart,
      protagonistName + ' is ' + indefiniteArticle(protagonist.occupation) + ' who just got robbed by ' + indefiniteArticle(secondaryCharacter.adjective) + ' ' + secondaryCharacter.genderName + ', but ' + protagonist.objectivePronoun + ' luck seems to be looking up, as another ' + secondaryCharacter.adjective + ' ' + secondaryCharacter.genderName +
      ' has taken ' + protagonist.personalPronoun + ' in',
      protagonistName + " has a few reasons why she wants to 'reset' " + protagonist.objectivePronoun + ' image & life as a new ' + protagonist.occupation,
      protagonistName + ', ' + indefiniteArticle(protagonist.adjective) + ' ' + protagonist.age + '-old ' + protagonist.occupation + ", hasn't gotten along with " + protagonist.objectivePronoun + ' younger ' +
      secondaryCharacter.relation + ', ' + secondaryCharacter.firstName + ', in ' + setting.timespan + 's'
    ]

    // Two characters
    var structuresTwo = [
      'Having lost ' + protagonist.objectivePronoun + ' ' + tertiaryCharacter.relation + ', ' + protagonist.occupation + ' ' + protagonistName + ' is doing ' +
      protagonist.objectivePronoun + ' best to raise ' + protagonist.objectivePronoun + ' young ' + secondaryCharacter.relation + ' ' + secondaryCharacter.firstName + ' as a single ' + protagonist.relationSek,
      'On a ' + indefiniteArticle(setting.timeOfDay) + ' lit by a crimson full moon, an ordinary ' + protagonist.occupation + ' named ' + protagonistName + ' meets a self-proclaimed ' + secondaryCharacter.occupation + ' named ' + secondaryCharacter.firstName + ' at a festival'
    ]

    // Setting
    var structuresSetting = [
      'A story set in ' + setting.place,
      "'" + title.primary + "' takes place in a " + setting.location,
      'The anime focuses on ' + indefiniteArticle(protagonist.object) + ' club in a certain ' + setting.location + ', and its members',
      'The ' + setting.country + ' ' + setting.countryStateform + ' is at war with the neighboring ' + setting.countrySekStateform + ' of ' + setting.countrySek,
      "The 'classic " + protagonist.group + ' ' + setting.genreMain + "'-story takes place during the " + capitalize(setting.era) + ' era',
      'The ' + setting.genreMain + ' story is set in ' + setting.place + ', which is haunted by ' + protagonist.threatAdjective + " '" +
      protagonist.threatRace + "' who are devouring " + protagonist.alliesRace,
      'On a ' + setting.season + ' day…\nA massive ' + setting.catastrophe + ' suddenly strikes ' + setting.place
    ]

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

    meta.sentences = 1
    return result
  }

  if (type === 'mid') {
    var merge
    if (meta.firstSentenceRelationLog === 1) {
      // One Character
      merge = [
        'Then, one day, ' + protagonist.genderPerfectTense + ' attacked by ' + indefiniteArticle(protagonist.threatGroupSize) + ' of ' + protagonist.threat + ' and saved by a mysterious ' + tertiaryCharacter.genderName,
        capitalize(protagonist.objectivePronoun) + ' ' + secondaryCharacter.relation + ', ' + secondaryCharacter.firstName + ', is also ' + indefiniteArticle(protagonist.occupation),
        'The difference is ' + protagonist.genderPerfectTense + ' ' + indefiniteArticle(protagonist.race) + '; but ' + protagonist.genderPerfectTense + ' not alone',
        'After one ' + setting.weather + ' ' + setting.timespan + ', ' + protagonist.pronoun + " doesn't turn up at " + setting.occupationLocation +
        ', having been admitted into a hospital in a distant ' + setting.locationPlace,
        capitalize(protagonist.pronoun) + ' meets ' + indefiniteArticle(tertiaryCharacter.genderName) + ' named ' + tertiaryCharacter.firstName +
        ' who dislikes disruptions in ' + tertiaryCharacter.objectivePronoun + ' everyday life',
        capitalize(protagonist.objectivePronoun) + ' life changes after ' + protagonist.pronoun + ' met ' + secondaryCharacter.firstName + ' ' + secondaryCharacter.lastName + ' of a Research Institute, who offered ' + protagonist.personalPronoun + ' a drug that can change ' + protagonist.objectivePronoun + ' appearance to ' + random.integer({min: 2, max: 100}) + '-years-old and to become a subject in an experiment for one year',
        protagonist.firstName + " believes in the folklore that says 'long ago, every human was able to see the " + protagonist.threatRace + "' and dreams of unraveling the ancient mystery to make the " + setting.locationPlace + ' a place where people and ' + protagonist.threatRace + ' can live together in peace',
        capitalize(protagonist.genderPerfectTense) + ' pretty bad at ' + protagonist.verbPresentParticiple + ', but chance brings ' + protagonist.objectivePronoun + ' little family and one of ' + protagonist.objectivePronoun + ' ' + secondaryCharacter.relation + ', ' + secondaryCharacter.firstName + ', together for homemade adventures',
        'No one would have expected that this ' + protagonist.age + ' year old young ' + protagonist.genderName + ' would eventually become a ' + protagonist.occupation + ' called a great ' + protagonist.relationSek + ' by others',
        'But, that was not the only thing in ' + protagonist.objectivePronoun + ' life that ' + protagonist.firstName + ' was feeling frustrated about…',
        'In ' + protagonist.objectivePronoun + ' dying moments, ' + protagonist.firstName + ' is transported to a ' + setting.locationPlace + ' of magic with other famous ' + protagonist.occupationPlural + ' throughout history',
        'Through strange circumstances ' + protagonist.pronoun + ' finds ' + protagonist.personalPronoun + 'self drawn into the ' + setting.locationPlace + ' of survival games by a host, ' + tertiaryCharacter.firstName + ' ' + tertiaryCharacter.lastName,
        'Behind this, ' + protagonist.pronoun + ' has feelings of wanting to surpass ' + secondaryCharacter.firstName + ', who is respected as ' + indefiniteArticle(protagonist.occupation),
        'Only a ' + protagonist.adjective + ' ' + protagonist.occupation + ' can have the privilege to contract with a ' + ' spirit'
      ]
    } else if (meta.firstSentenceRelationLog === 2) {
      // group
      merge = [
        'However, through mysterious circumstances, the girls find themselves the final survivors in ' +
        indefiniteArticle(protagonist.threatRace) + ' attack, and continue to live at the ' + setting.occupationLocation
      ]
    } else {
      // Setting
      merge = [
        'In the ' + setting.country + ' ' + setting.countryStateform + ', the ' + protagonist.adjective + ', woman-admiring ' + protagonist.firstName + ' ' + protagonist.lastName + ' hates ' + protagonist.abstractConcept + ', but due to certain circumstances, ' + protagonist.pronoun + ' grudgingly takes the high grade ' + protagonist.occupation + ' exam',
        random.integer({min: 2, max: 10000}) + ' years later, ' + indefiniteArticle(protagonist.occupation) + ' named ' + protagonist.firstName + ' ' +
        protagonist.lastName + ' accidently uncovers the ' + protagonist.threatRace + ' in a hidden ' + setting.location + ' under ' + protagonist.objectivePronoun + ' family’s ' + setting.locationPlace,
        capitalize(protagonist.adjective) + ' appearance, ' + protagonist.adjective + ' intelligence, ' + protagonist
        .adjective + ' in arts and sports... just ' + protagonist.adjective
      ]
    }

    var structures = [
      'The fate of the world is threatened as an army of  ' + protagonist.threatAdjective + ' ' + protagonist.threat + '  are sent from the future to alter the course of history',
      protagonist.firstName + ' inherits memories and interests from ' + protagonist.objectivePronoun + ' previous life, and aims to be a ' + protagonist.objectRelation +
      ' of a ' + capitalize(protagonist.objectSecond) + protagonist.object + ', a large ' + protagonist.objectAdj + ' weapon that really exists in ' +
      protagonist.objectivePronoun + ' ' + setting.locationPlace,
      'Egged on by ' + protagonist.objectivePronoun + ' friends, ' + protagonist.firstName + ' goes on ' + protagonist.objectivePronoun + ' knees and confesses ' + protagonist.objectivePronoun + ' love to ' + protagonist.objectivePronoun + ' ' + secondaryCharacter.relation + ' named ' + secondaryCharacter.firstName,
      'The ' + setting.genre + ' ' + protagonist.characterTrope + ' trend had started with a small festival in a certain ' + setting.locationPlace,
      'Those that dare to explore the depths are known as ' + protagonist.threat,
      'The sudden disaster that becomes known as the ' + capitalize(setting.wildcard) + ' ' + capitalize(setting.catastropheSpice) + ' ' + capitalize(setting.catastrophe) + ' kills ' + random.integer({min: 2, max: 10000}) + ' people and injures ' + random.integer({min: 2, max: 10000}) + ' more',
      'This story follows a ' + setting.locationPlace + ' ' + protagonist.occupation +
      ' who has a great interest in ' + protagonist.threatRace + ' and ' + protagonist.objectivePronoun + ' interaction with the various ' + protagonist.threatRace + ' in ' + protagonist.objectivePronoun + ' ' + setting.occupationLocation + ', each with their own ' + meta.adjective + ' problems',
      protagonist.firstName + ' also often has business trips from the capital to the other ' + setting.locationPlace + "'s to check on the situation and " + random.pickone(occupationPlural) + ' there',
      'Until the day when ' + indefiniteArticle(tertiaryCharacter.occupation) + ' they know requests their help in taking down a new ' + protagonist.threatGroup + ' muscling in on the territory of a top ' + protagonist.threatGroup,
      protagonist.firstName + ' enrolls in the ' + setting.locationPlace + "'s leading elite public morals " + setting.occupationLocation +
      ' and is soon invited into the Anti-' + protagonist.occupation + ' ' + protagonist.threatGroup + ' by its founder, ' + secondaryCharacter.firstName + ' ' + secondaryCharacter.lastName,
      "So who wouldn't take the chance to change the " + setting.time + ' if given the opportunity',
      protagonist.firstName + ' rescues a homeless ' + tertiaryCharacter.genderName + ' on the street one day from some ' + protagonist.threatGroup + ', and the ' + tertiaryCharacter.genderName + ' gives ' + protagonist.firstName + ' an object that imprints ' + indefiniteArticle(protagonist.object) + ' on ' + protagonist.objectivePronoun + ' ' + protagonist.bodypart,
      'However, one day, a large ' + protagonist.threadRaceSingular + ' attacks ' + setting.country,
      'One day in ' + setting.season + ', the cute but weird ' + tertiaryCharacter.genderName + ' ' + tertiaryCharacter.firstName + ' ' + tertiaryCharacter.lastName + ', from the famous ' + protagonist.object + ' company, comes to pay a visit',
      protagonist.firstName + ' and ' + secondaryCharacter.firstName + ', the heroes of the story, hold the keys to open the ' + protagonist.object,
      tertiaryCharacter.lastName + ', who is a veteran ' + protagonist.occupation + ' for the ' + protagonist.occupation + ' department, is looking for a successor now that ' + tertiaryCharacter.genderPerfectTense + ' approaching retirement age',
      protagonist.firstName + ' ' + protagonist.lastName + ' uses ' + protagonist.objectivePronoun + ' power without others knowing, and lives a fairly normal, average school life',
      protagonist.firstName + ' refuses, chops off ' + protagonist.objectivePronoun + ' lovely ' + protagonist.bodypart + ', and runs away to the neighboring ' +
      setting.countryStateform + ' of ' + setting.country,
      'But a new conflict approached unseen',
      tertiaryCharacter.firstName + ', a  ' + protagonist.occupation + ' from an alternate-dimension ' + protagonist.occupation + ' ' + setting.locationPlace +
      ', challenged the ' + protagonist.occupation + ' king for the throne and lost',
      secondaryCharacter.firstName + ' and ' + protagonist.firstName + ' are almost constantly under attack and must learn to live their lives, avoiding being consumed by ' + protagonist.abstractConcept
    ]

    // merge neutral 'structures' with merge
    structures = merge.concat(structures)

    result = random.pickone(structures.filter(function (element, index) {
      return index !== setting.structureTaken
    }))
    setting.structureTaken = structures.indexOf(result)

    meta.sentence = meta.sentence + 1
    return result
  }

  if (type === 'last') {
    protagonistName = random.pickone([
      protagonist.firstName,
      protagonist.firstName + ' ' + protagonist.lastName
    ])

    result = random.pickone([
      'Can ' + protagonistName + ' save the ' + setting.locationPlace + '?',
      'The adventure begins!',
      'Based on the popular ' + meta.source + '.',
      'In full CGI.',
      'Based on myths from ' + setting.country + '.',
      'Maybe...there is even a little hope for some ' + protagonist.abstractConcept + ' in ' + protagonist.objectivePronoun + ' future.'
    ])

    return result
  }
}
