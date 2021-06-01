/**
 * credit to @leerob who wrote this
 * @see https://github.com/leerob/leerob.io/blob/master/components/ViewCounter.js
 */
import React, { useState, useEffect, FC } from 'react'
import format from 'comma-number'

import { loadDb } from '../lib/db'

interface ViewCounterPropsType {
  id: string;
}

const ViewCounter: FC<ViewCounterPropsType> = ({ id }) => {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    const onViews = (newViews: firebase.database.DataSnapshot) => setViews(newViews.val())

    let db: firebase.database.Reference;

    const fetchData = async () => {
      db = await loadDb()
      db.child(id).on('value', onViews, (error: Error) => {
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
