import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

const WINDOW = window
const DOC = document

const useInfiniteScroll = ({
  expectRef = false,
  fetchMore,
  ignoreScroll = false,
  offset = 0
}) => {
  const ref = useRef()

  const fetchIfNeeded = useCallback(() => {
    const container = expectRef ? ref.current : (DOC.scrollingElement || DOC.documentElement)
    const containerHeight = expectRef ? container.offsetHeight : WINDOW.innerHeight
    const { scrollHeight, scrollTop } = container

    if (scrollTop + containerHeight >= scrollHeight - offset) {
      fetchMore(containerHeight, scrollHeight, scrollTop, offset)
    }
  }, [expectRef, fetchMore, offset])

  // Attach event
  /*
   * useLayoutEffect because when add loading in the container (changing height),
   * event fires again before removeEventListener if it is async (useEffect)
   */
  useLayoutEffect(() => {
    if (ignoreScroll) return

    const container = expectRef ? ref.current : WINDOW
    const evtArgs = ['scroll', fetchIfNeeded, false]

    container.addEventListener(...evtArgs)
    return () => {
      container.removeEventListener(...evtArgs)
    }
  }, [expectRef, fetchIfNeeded, ignoreScroll])

  // Fetch until fill the page
  useEffect(() => {
    if (!ignoreScroll) fetchIfNeeded()
  }, [fetchIfNeeded, ignoreScroll])

  return expectRef ? ref : null
}

export default useInfiniteScroll
