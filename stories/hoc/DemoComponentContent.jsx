import React, { forwardRef } from 'react'

import UsersList from '../_utils/UsersList'
import withInfiniteScroll from '../../src/infinite-scroll-hoc/withInfiniteScroll'

const DemoComponentContent = forwardRef(({ users }, ref) => {
  const props = {
    ...ref && {
      style: { height: '80vh', overflow: 'auto' },
      ref
    }
  }

  return (
    <div {...props}>
      <UsersList users={users} />
    </div>
  )
})

DemoComponentContent.displayName = 'DemoComponentContent'

DemoComponentContent.propTypes = {
  users: UsersList.propTypes.users
}

export default withInfiniteScroll(DemoComponentContent)
