import React, { useCallback, useReducer } from 'react'
import PropTypes from 'prop-types'

import UsersList from '../_utils/UsersList'
import { reducer, initialState } from '../_utils/reducer'
import { fetchUsers } from '../_utils/fetchers'
import { useInfiniteScroll } from '../../src'

const DemoComponent = ({ expectRef, offset, log }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isFetching, page, totalPages, users } = state

  /**
    * Ensure that fetchMore changes only when needed to prevent unnecessary renders
    * https://overreacted.io/a-complete-guide-to-useeffect/#but-i-cant-put-this-function-inside-an-effect
    */
  const fetchMore = useCallback(() => {
    log(page)
    // In a real case, you should cancel the current fetch on unmount to prevent errors
    fetchUsers(page + 1, dispatch)
  }, [page, log])

  const ref = useInfiniteScroll({
    expectRef,
    fetchMore,
    ignoreScroll: isFetching || page >= totalPages,
    offset
  })

  const props = {
    ...expectRef && {
      style: { height: '80vh', overflow: 'auto' },
      ref
    }
  }

  return (
    <div {...props}>
      <UsersList users={users} />
      {isFetching &&
        <div>Loading...</div>
      }
    </div>
  )
}

DemoComponent.propTypes = {
  expectRef: PropTypes.bool,
  offset: PropTypes.number,
  log: PropTypes.func.isRequired
}

DemoComponent.defaultProps = {
  expectRef: false,
  offset: 0
}

export default DemoComponent
