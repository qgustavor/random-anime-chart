// TODO: work on localization

exports.capitalize = function (s) {
  var u = s.indexOf(' ')
  if (s.length <= 0) return s

  var p = u > 0
  ? s[0].toUpperCase() + s.slice(1, u) + ' ' + s[u + 1].toUpperCase() + s.slice(u + 2)
  : s[0].toUpperCase() + s.slice(1)
  return p
}

exports.indefiniteArticle = function (s) {
  var vowels = 'aAeEiIoOuU'
  var startsWithVowel = vowels.indexOf(s[0]) !== -1
  return (startsWithVowel ? 'an ' : 'a ') + s
}
