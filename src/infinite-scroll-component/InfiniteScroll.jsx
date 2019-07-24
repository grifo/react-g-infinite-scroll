import PropTypes from 'prop-types'

import useInfiniteScroll from '../infinite-scroll-hook/useInfiniteScroll'

const InfiniteScroll = ({
  expectRef,
  fetchMore,
  ignoreScroll,
  offset,
  children
}) => {
  const ref = useInfiniteScroll({
    expectRef,
    fetchMore,
    ignoreScroll,
    offset
  })

  return expectRef ? children(ref) : children
}

InfiniteScroll.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ]),
  expectRef: PropTypes.bool,
  fetchMore: PropTypes.func.isRequired,
  ignoreScroll: PropTypes.bool,
  offset: PropTypes.number
}

InfiniteScroll.defaultProps = {
  children: null,
  expectRef: false,
  ignoreScroll: false,
  offset: 0
}

export default InfiniteScroll
