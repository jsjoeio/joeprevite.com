/**
 * credit to @leerob who wrote this
 * @see https://github.com/leerob/leerob.io/blob/master/components/ViewCounter.js
 */
import React, { useState, useEffect } from 'react'
import format from 'comma-number'

import { loadDb } from '../lib/db'

const ViewCounter = ({ id }) => {
  const [views, setViews] = useState('')

  useEffect(() => {
    const onViews = newViews => setViews(newViews.val())

    let db

    const fetchData = async () => {
      db = await loadDb()
      db.child(id).on('value', onViews, error => {
        console.error('Error reading value', error)
      })
    }

    fetchData()

    return () => {
      if (db) {
        db.child(id).off('value', onViews)
      }
    }
  }, [id])

  useEffect(() => {
    const registerView = () =>
      fetch(`/.netlify/functions/increment-views?id=${id}`)

    registerView()
  }, [id])

  return <p>{`${views ? format(views) : '–––'} views`}</p>
}

export default ViewCounter
