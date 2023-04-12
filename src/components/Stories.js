import React from 'react'

import { useGlobalContext } from '../context/context'
import { Button, CircularProgress } from '@mui/material'
import moment from 'moment/moment'
import { Alert } from '@mui/material'

const Stories = () => {
  const { isLoading, hits, removeStory, setAsRead, read } = useGlobalContext()

  if (isLoading) {
    return (
      <div className='loading-container'>
        <CircularProgress size={'5rem'} thickness={2} />
      </div>
    )
  }
  return (
    <>
      <section className='stories'>
        {hits.length > 0 ? (
          hits.map((story) => {
            const {
              objectID,
              title,
              num_comments,
              url,
              points,
              author,
              created_at,
            } = story
            return (
              <article className='story' key={objectID}>
                <h4 className='title'>{title}</h4>
                <p className='info'>
                  {points} points by <span>{author} | </span>
                  {num_comments} comments
                </p>
                <p className='info'>
                  {moment(`${created_at}`, 'YYYYMMDD').fromNow()}
                </p>

                {/* <p>{moment(`${created_at}`).subtract(10, 'days').calendar()}</p> */}

                <div>
                  <Button
                    href={url}
                    className='read-link'
                    target='_blank'
                    rel='noopener noreferrer'>
                    read more
                  </Button>
                  <Button
                    color='error'
                    className='remove-btn'
                    onClick={() => {
                      removeStory(objectID)
                    }}>
                    remove
                  </Button>
                  <Button
                    color='success'
                    className='set-as-read-btn'
                    onClick={() => {
                      setAsRead(objectID)
                    }}>
                    readed
                  </Button>
                </div>
              </article>
            )
          })
        ) : (
          <Alert
            sx={{ width: '320px', textTransform: 'uppercase' }}
            severity='error'
            className='alert'>
            there is nothing left
          </Alert>
        )}
      </section>
      {read.length > 0 && (
        <div className='stories'>
          <h1>read</h1>
          {read.map((story) => {
            const {
              objectID,
              title,
              num_comments,
              url,
              points,
              author,
              created_at,
            } = story
            return (
              <article className='story read' key={objectID}>
                <h4 className='title'>{title}</h4>
                <p className='info'>
                  {points} points by <span>{author}</span>
                  <br />
                  {num_comments} comments
                </p>
                <p className='info'>
                  {moment(`${created_at}`, 'YYYYMMDD').fromNow()}
                </p>
                <div>
                  <Button
                    href={url}
                    className='read-link'
                    target='_blank'
                    rel='noopener noreferrer'>
                    read more
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Stories
