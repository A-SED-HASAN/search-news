import React, { useContext, useEffect, useReducer } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  SET_AS_READ,
  HANDLE_PAGE,
  HANDLE_SEARCH,
  HANDLE_CHANGE,
} from '../reducer & action/actions'
import reducer from '../reducer & action/reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState = {
  isLoading: true,
  hits: [],
  read: [],
  query: 'react',
  page: 0,
  nbPages: 0,
  hitsPerPage: '10',
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const removeStory = (id) => {
    dispatch({
      type: REMOVE_STORY,
      payload: { id },
    })
  }
  const setAsRead = (id) => {
    dispatch({
      type: SET_AS_READ,
      payload: { id },
    })
  }

  const handleSearch = (query) => {
    dispatch({
      type: HANDLE_SEARCH,
      payload: { query },
    })
  }

  const handlePage = (value) => {
    dispatch({
      type: HANDLE_PAGE,
      payload: { value },
    })
  }
  const handleChange = (query) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { query },
    })
  }
  useEffect(() => {
    fetchStories(
      `${API_ENDPOINT}query=${state.query}&page=${state.page}&hitsPerPage=${state.hitsPerPage}`
    )
  }, [state.query, state.page, state.hitsPerPage])

  return (
    <AppContext.Provider
      value={{
        ...state,
        removeStory,
        setAsRead,
        handleSearch,
        handlePage,
        handleChange,
      }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
