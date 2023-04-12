import React from 'react'
import { useGlobalContext } from '../context/context'
import { Button } from '@mui/material'
const Buttons = () => {
  const { isLoading, page, nbPages, handlePage } = useGlobalContext()
  return (
    <div className='btn-container'>
      <Button
        variant='contained'
        disabled={isLoading}
        onClick={() => handlePage('dec')}>
        prev
      </Button>
      <p>
        {page + 1} of {nbPages}
      </p>
      <Button
        variant='contained'
        disabled={isLoading}
        onClick={() => handlePage('inc')}>
        next
      </Button>
    </div>
  )
}

export default Buttons
