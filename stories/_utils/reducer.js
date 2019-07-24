export const initialState = {
  isFetching: false,
  page: 0,
  totalPages: undefined,
  users: []
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST':
      return {
        ...state,
        isFetching: true,
        page: action.page
      }
    case 'SUCCESS':
      const users = action.payload.page === 1 ? [
        ...action.payload.data
      ] : [
        ...state.users,
        ...action.payload.data
      ]
      return {
        ...state,
        isFetching: false,
        totalPages: action.payload.total_pages,
        users
      }
    default:
      throw new Error()
  }
}
