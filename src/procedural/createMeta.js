const { capitalize } = require('./helpers')

module.exports = function createMeta (state) {
  const { random, setting, meta, names } = state
  const { genres, studio, source } = names
  const genresCopy = genres.slice()

  let genre = random.pickone(genresCopy)
  setting.genre = genre
  meta.genre = capitalize(genre)
  setting.genreMain = genre
  genresCopy.splice(genresCopy.indexOf(genre), 1)

  const genreCount = random.integer({min: 1, max: 5})
  for (let y = 0; y < genreCount; y++) {
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
