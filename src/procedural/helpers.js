// From my tests the original capitalizes the first two words;
// changed to capitalize all words.
export function capitalize (input) {
  return input.replace(/(^|\s)\w/g, (match) => {
    return match.toUpperCase()
  })
}

// noop: articles are handled by the template function
export function indefiniteArticle (s) {
  return s
}

export function template (source, context, filters) {
  return source.replace(/\{([^}]+)\}/g, (match, values) => {
    const calls = values.split(/\s*\|\s*/g)
    const firstKey = calls.shift()

    // Check if a function was called
    // Example: {random | 1 | 100}
    if (typeof filters[firstKey] === 'function') {
      return filters[firstKey](calls)
    }

    // Split keys by dot and find key in context
    const parts = firstKey.split('.')
    let currentValue = context
    let part
    while (parts.length > 0 && currentValue) {
      part = parts.shift()
      currentValue = currentValue[part]
    }

    // If the result is an array then pick one random value from it
    if (Array.isArray(currentValue)) {
      currentValue = filters.pickone(currentValue)
    }

    // Remove the article if not needed
    const articleFilterIndex = calls.indexOf('indefiniteArticle')
    if (context.keysWithArticles.includes(part) && articleFilterIndex === -1) {
      currentValue = currentValue.replace(/^\S+\s+/, '')
    } else if (articleFilterIndex !== -1) {
      calls.splice(articleFilterIndex, 1)
    }

    // Apply the filters
    // Example: capitalize
    let fn = calls.shift()
    while (fn && typeof filters[fn] === 'function') {
      currentValue = filters[fn](currentValue)
      fn = calls.shift()
    }

    // Return the final value
    return currentValue
  })
}

export function randomFilter (random) {
  return (values) => random.integer({
    min: Number(values[0]),
    max: Number(values[1])
  })
}

