import { db } from '../src/lib/db-admin'

exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing "id" query parameter',
      }),
    }
  }
  const ref = db.ref('joeprevite-dot-com/views').child(id)

  let totalViews
  await ref.once('value', snapshot => {
    const value = snapshot.val()
    console.log('from firebase db:', value)
    totalViews = value
  })

  console.log('here is total views', totalViews)

  return {
    statusCode: 200,
    body: JSON.stringify({
      pageId: id,
      totalViews: totalViews !== null ? totalViews : 0,
    }),
  }
}
