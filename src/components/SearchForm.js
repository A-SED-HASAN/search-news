import React from 'react'
import { useGlobalContext } from '../context/context'
import { TextField } from '@mui/material'

const SearchForm = () => {
  const { query, handleSearch, hitsPerPage, handleChange } = useGlobalContext()

  return (
    <form
      className='search-form'
      onSubmit={(e) => {
        e.preventDefault()
      }}>
      <h2>search news</h2>
      <div>
        <TextField
          autoFocus
          size='large'
          variant='standard'
          type='text'
          className='form-input'
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <select
          onChange={(e) => handleChange(e.target.value)}
          value={hitsPerPage}>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
        </select>
      </div>
    </form>
  )
}

export default SearchForm
