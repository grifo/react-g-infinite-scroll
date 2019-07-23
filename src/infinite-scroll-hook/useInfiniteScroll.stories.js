import React, { useCallback, useReducer } from 'react'

import { storiesOf } from '@storybook/react'
import { boolean, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import useInfiniteScroll from './useInfiniteScroll'

const initialState = {
  isFetching: false,
  page: 0,
  totalPages: undefined,
  users: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST':
      return {
        ...state,
        isFetching: true,
        page: action.page
      }
    case 'SUCCESS':
      return {
        ...state,
        isFetching: false,
        totalPages: action.payload.total_pages,
        users: [
          ...state.users,
          ...action.payload.data
        ]
      }
    default:
      throw new Error()
  }
}

const fetchUsers = (page, dispatch) => {
  dispatch({ type: 'REQUEST', page })

  window.fetch('https://reqres.in/api/users?delay=1&page=' + page).then(response =>
    response.json()
  ).then(payload => {
    dispatch({
      type: 'SUCCESS',
      payload
    })
  })
}

const DemoComponent = ({ expectRef, offset, log }) => {
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
      <ul>
        {users.map(user =>
          <li>
            <dl>
              <dt>Avatar</dt>
              <dd><img src={user.avatar} /></dd>
              <dt>ID</dt>
              <dd>{user.id}</dd>
              <dt>Email</dt>
              <dd>{user.email}</dd>
              <dt>First name</dt>
              <dd>{user.first_name}</dd>
              <dt>Last name</dt>
              <dd>{user.last_name}</dd>
            </dl>
          </li>
        )}
      </ul>
      {isFetching &&
        <div>Loading...</div>
      }
    </div>
  )
}

storiesOf('Infinite Scroll', module)
  .add('useInfiniteScroll', () => (
    <DemoComponent
      expectRef={boolean('Expect ref', false)}
      offset={number('Offset (px)', 20)}
      log={action('Fetching page')}
    />
  ))
