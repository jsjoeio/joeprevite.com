import { getFirebaseDbAdmin } from '../src/lib/db-admin'

exports.handler = async (event, context) => {
  const db = getFirebaseDbAdmin()
  const { id } = event.queryStringParameters

  if (!id) {
    let totalViews
    await db.ref('joeprevite-dot-com/views').once('value', snapshot => {
      const views = snapshot.val()
      // Grabs all the views for all posts
      const allViews = Object.values(views).reduce(
        (total, value) => total + value,
      )
      totalViews = allViews
    })
    return {
      statusCode: 200,
      body: JSON.stringify({
        totalViews: totalViews || 0,
      }),
    }
  }

  const ref = db.ref('joeprevite-dot-com/views').child(id)

  let totalViews
  await ref.once('value', snapshot => {
    const value = snapshot.val()
    totalViews = value
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      pageId: id,
      totalViews: totalViews !== null ? totalViews : 0,
    }),
  }
}
