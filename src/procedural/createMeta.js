var { capitalize } = require('./helpers')
var {genres, studio, source} = require('./names')

module.exports = function createMeta (state) {
  var { random, setting, meta } = state
  var genresCopy = genres.slice()

  var genre = random.pickone(genresCopy)
  setting.genre = genre
  meta.genre = capitalize(genre)
  setting.genreMain = genre
  genresCopy.splice(genresCopy.indexOf(genre), 1)

  var genreCount = random.integer({min: 1, max: 5})
  for (var y = 0; y < genreCount; y++) {
    genre = random.pickone(genresCopy)
    meta.genre += ', ' + capitalize(genre)
    genresCopy.splice(genresCopy.indexOf(genre), 1)
  }

  meta.studio = random.pickone(studio)
  meta.source = random.pickone(source)

  meta.malScore = random.integer({min: 1, max: 10})

  if (meta.malScore < 7 && random.bool()) {
    meta.malScore += random.integer({min: 1, max: 3})
  }
  if (meta.malScore < 5 && random.bool()) {
    meta.malScore += random.integer({min: 1, max: 3})
  }
  if (meta.malScore < 3 && random.bool()) {
    meta.malScore += random.integer({min: 1, max: 3})
  }
  if (meta.malScore > 7 && random.bool()) {
    meta.malScore -= random.integer({min: 1, max: 2})
  }
  if (meta.malScore > 8 && random.bool()) {
    meta.malScore -= random.integer({min: 1, max: 2})
  }
  meta.malScore += random.integer({min: 1, max: 100}) / 100
}
