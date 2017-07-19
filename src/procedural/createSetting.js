/* global chance */
var {locations, locationPlace, locationNature, occupationLocation,
stateform, place, period, era, weather, time, timespan,
catastrophe, timeOfDay, season} = require('./names')

module.exports = function createSetting (state) {
  var { random, setting } = state

  setting.location = random.pickone(locations)
  setting.locationPlace = random.pickone(locationPlace)
  setting.locationNature = random.pickone(locationNature)
  setting.occupationLocation = random.pickone(occupationLocation)
  setting.country = random.country({ full: true })
  setting.countrySek = random.country({ full: true })
  setting.countryStateform = random.pickone(stateform)
  setting.countrySekStateform = random.pickone(stateform)
  setting.place = random.pickone(place)
  setting.period = random.pickone(period)
  setting.era = random.pickone(era)
  setting.weather = random.pickone(weather)
  setting.time = random.pickone(time)
  setting.timespan = random.pickone(timespan)
  setting.catastrophe = random.pickone(catastrophe)
  setting.timeOfDay = random.pickone(timeOfDay)
  setting.season = random.pickone(season)

  setting.wildcard = random.pickone([].concat(
    chance.countries().map(function (e) {
      return e.name
    }),
    locationPlace,
    locationNature,
    place
  ))

  setting.catastropheSpice = setting.wildcardSubject
}
