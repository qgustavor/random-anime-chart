# Random Anime Charts

> Generate random anime charts

Based on http://animedreammachine.com/ code.

This repository will be abandoned when the features below get implemented as the original website changed a lot so this repository is not needed anymore. Like, instead of using seeded randomization it allows saving images of the generated content; some bugs were fixed; images were implemented, and also I hate ads, at all, and that's why I use GitHub Pages, but the original author have to pay the domain and the server.

## Roadmap

- [x] Organize code in modules
- [x] Use seeded randomization so people can share their generated charts
- [x] Replace jQuery with [Vue PWA](https://github.com/vuejs-templates/pwa):  
    jQuery was only being used for the ready event, everything else used just plain DOM manipulation and HTML
    modification via concatenation and innerHTML. Because of that I think Vue was the best choice as it's
    template based system would be more intuitive than using React, more organized than using plain DOM and
    more future friendly than using jQuery.
- [x] Improve CSS
    - [x] Make page work in small screens
    - [x] Center elements
    - [x] Move that big button to the left to save space
    - [x] Added a material-like style on cards (which were originally boxes)
    - [x] Replaced Open Sans font (which I think many computers don't have) with Medium font-stack
- [ ] Localize website
    - [x] Make language select interface
    - [ ] Move generation text data to separate files
    - [ ] Create interface translation files
    - [ ] Translate page to Portuguese (because I want to)
    - [ ] Write instructions to future collaborators
- [ ] Improve design
    - [ ] Replace Vue PWA icons with custom ones
    - [ ] Show episode counts
    - [ ] Generate posters ([inspiration](https://u.biyori.moe/dNapdag4.jpg))

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# publish to gh-pages
npm run deploy
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
