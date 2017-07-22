export function getLanguageData (language) {
  return import('json-loader!yaml-loader!../lang/' + language + '.yaml')
}
