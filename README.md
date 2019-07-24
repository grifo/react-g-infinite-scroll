# react-g-infinite-scroll

This package is an infinite scroll: component, hook or HOC. You choose!

## Installation:

```
yarn add react-g-infinite-scroll
```

or

```
npm install --save react-g-infinite-scroll
```

## How to:

Options:

| Option | Default | Description |
| - | - | - |
| **expectRef**[1] | `false` | If this is `false`, the script will use the window scroll, but if you want to use the infinite scroll in a custom element, you should pass `true`, then you will receive a `ref` to add to the element |
| **fetchMore**[2] | - | The function that will be called when need to load the next page |
| **ignoreScroll**[3] | `false` | You should use this prop when the data is fetching or wether there is no more data to fetch. When `ignoreScroll` is `true`, the infinite scroll stops to watch the scroll |
| **offset** | `0` | The offset of the scroll to call the fetchMore |

1. Keep in mind that if you want to use scroll in a custom element, instead the window, you need to add classes to activate the scroll (`overflow: "auto | hidden"` and a custom `height`)

2. Ensure that fetchMore changes only when needed to prevent unnecessary renders
https://overreacted.io/a-complete-guide-to-useeffect/#but-i-cant-put-this-function-inside-an-effect

3. When the `ignoreScroll` is updated from `true` to `false` (normally after a fetch), it is a trigger to recalculate if needs a new fetch - This is to solve cases when the content do not fill whole space. Eg: If your content has 200px, but your container has 300px, then we need to fetch one more page

You have three ways to use the infinite scroll package: Hook, Component or HOC.

### Hook

How to use the hook with scroll in the window:

```js
import React, { useCallback } from 'react'
import { useInfiniteScroll } from 'react-g-infinite-scroll'

const MyComponent = ({ isFetching }) => {
  const fetchMore = useCallback(() => {
    /* YOUR_FETCH_CODE_HERE */
  }, [/* YOUR_FETCH_DEPS_HERE */])

  useInfiniteScroll({
    fetchMore, // Shorthand to fetchMore: fetchMore
    ignoreScroll: isFetching,
    offset: 20
  })

  return /* CONTENT_HERE */
}
```

If you want to use the scroll in a custom element, you should pass the `expectRef: true` to the hook function and it will return a ref:

```js
  const ref = useInfiniteScroll({
    expectRef: true,
    fetchMore,
    ignoreScroll: isFetching,
    offset: 20
  })

  return (
    <div ref={ref} className={/* SCROLL_STYLES */}>
      {/* CONTENT_HERE */}
    </div>
  )
```

### Component

Notice: In the backstage it uses the hook

### HOC

Notice: In the backstage it uses the hook
