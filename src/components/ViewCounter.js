/**
 * credit to @leerob who wrote this
 * @see https://github.com/leerob/leerob.io/blob/master/components/ViewCounter.js
 */
import React, { useState, useEffect } from 'react'
// import format from 'comma-number';

import { loadDb } from '../lib/db'

const ViewCounter = ({ id }) => {
  const [views, setViews] = useState('')

  useEffect(() => {
    console.log('effect running')
    const onViews = newViews => {
      console.log(newViews.val(), 'is this empty')
      setViews(newViews.val())
    }
    let db

    const fetchData = async () => {
      console.log('fetching data')
      db = await loadDb()
      console.log(db, 'hi db')
      db.child(id).on('value', onViews)
    }

    fetchData()

    return () => {
      if (db) {
        db.child(id).off('value', onViews)
      }
    }
  }, [id])

  console.log('show me the views', views)

  useEffect(() => {
    const registerView = () =>
      fetch(`/.netlify/functions/increment-views?id=${id}`)

    registerView()
  }, [id])

  return <p>{`${views ? views : '–––'} views`}</p>
}

export default ViewCounter
