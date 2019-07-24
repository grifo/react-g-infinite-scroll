# react-g-infinite-scroll
Infinite scroll hook and HOC

If you will add in a custom DOM element, you should pass the `expectRef` and receive it from hook.

Keep in mind that if you want to use scroll in a custom element, instead the window, you need to add classes to activate the scroll (overflow: "auto | hidden" and a custom height)

While is loading or when has no more itens, use `ignoreScroll`
Don't forget to update the `ignoreScroll` to `false` when the loading ends (if it has more pages to load), because this trigger is used to load more data if the space is not full. Eg: If your content has 200px, but your container has 300px, we need to fetch one more page

Ensure that fetchMore changes only when needed to prevent unnecessary renders
https://overreacted.io/a-complete-guide-to-useeffect/#but-i-cant-put-this-function-inside-an-effect
