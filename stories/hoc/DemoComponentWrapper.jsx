import React, { useCallback, useReducer } from 'react'
import PropTypes from 'prop-types'

import { reducer, initialState } from '../_utils/reducer'
import { fetchUsers } from '../_utils/fetchers'
import DemoComponentContent from './DemoComponentContent'

const DemoComponentWrapper = ({ expectRef, offset, log }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isFetching, page, totalPages, users } = state

  /**
    * Ensure that fetchMore changes only when needed to prevent unnecessary renders
    * https://overreacted.io/a-complete-guide-to-useeffect/#but-i-cant-put-this-function-inside-an-effect
    */
  const fetchMore = useCallback(() => {
    log(page)
    fetchUsers(page + 1, dispatch)
  }, [page, log])

  const infiniteScrollProps = {
    expectRef,
    fetchMore,
    ignoreScroll: isFetching || page >= totalPages,
    offset
  }

  return (
    <div>
      <DemoComponentContent infiniteScrollProps={infiniteScrollProps} users={users} />
      {isFetching &&
        <div>Loading...</div>
      }
    </div>
  )
}

DemoComponentWrapper.propTypes = {
  expectRef: PropTypes.bool,
  offset: PropTypes.number,
  log: PropTypes.func.isRequired
}

DemoComponentWrapper.defaultProps = {
  expectRef: false,
  offset: 0
}

export default DemoComponentWrapper
