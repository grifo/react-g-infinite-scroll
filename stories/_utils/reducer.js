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
