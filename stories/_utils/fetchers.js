export const fetchUsers = (page, dispatch) => {
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
