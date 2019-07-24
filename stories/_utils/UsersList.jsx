import React from 'react'
import PropTypes from 'prop-types'

const UsersList = ({ users }) => (
  <ul>
    {users.map(user =>
      <li key={user.id}>
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
)

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.string,
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string
  }))
}

UsersList.defaultProps = {
  users: []
}

export default UsersList
