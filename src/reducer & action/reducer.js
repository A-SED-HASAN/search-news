import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  SET_AS_READ,
  HANDLE_PAGE,
  HANDLE_SEARCH,
  HANDLE_CHANGE,
} from './actions'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true }

    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      }

    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter(
          (story) => story.objectID !== action.payload.id
        ),
      }
    case SET_AS_READ:
      return {
        ...state,
        hits: state.hits.filter(
          (story) => story.objectID !== action.payload.id
        ),
        read: [
          ...state.read,
          state.hits.filter((story) => story.objectID === action.payload.id),
        ].flat(),
      }

    case HANDLE_SEARCH:
      return { ...state, query: action.payload.query, page: 0 }

    case HANDLE_PAGE:
      if (action.payload.value === 'inc') {
        let nextPage = state.page + 1
        if (nextPage > state.nbPages - 1) {
          nextPage = 0
        }
        return { ...state, page: nextPage, read: [] }
      }
      if (action.payload.value === 'dec') {
        let prevPage = state.page - 1
        if (prevPage < 0) {
          prevPage = state.nbPages - 1
        }
        return { ...state, page: prevPage, read: [] }
      }
      return
    case HANDLE_CHANGE:
      return { ...state, hitsPerPage: action.payload.query, page: 0 }
    default:
      throw new Error(`no matching "${action.type}" action `)
  }
}
export default reducer
