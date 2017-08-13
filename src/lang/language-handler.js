export function getLanguageData (language) {
  return import('json-loader!yaml-loader!./' + language.replace(/\W/g, '').toLowerCase() + '.yaml')
}
