import React from 'react'
import PropTypes from 'prop-types'

import useInfiniteScroll from '../infinite-scroll-hook/useInfiniteScroll'

const withInfiniteScroll = (WrappedComponent) => {
  const WithInfiniteScroll = ({
    infiniteScrollProps,
    ...props
  }) => {
    const ref = useInfiniteScroll(infiniteScrollProps)
    const refProp = {
      ...ref && { ref }
    }

    return (
      <div><WrappedComponent {...props} {...refProp} /></div>
    )
  }

  WithInfiniteScroll.propTypes = {
    infiniteScrollProps: PropTypes.shape({
      expectRef: PropTypes.bool,
      fetchMore: PropTypes.func.isRequired,
      ignoreScroll: PropTypes.bool,
      offset: PropTypes.number
    })
  }.isRequired

  WithInfiniteScroll.displayName = `WithInfiniteScroll(
    ${WrappedComponent.displayName || WrappedComponent.name || 'Component'}
  )`
  return WithInfiniteScroll
}

export default withInfiniteScroll
