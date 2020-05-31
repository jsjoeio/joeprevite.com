const admin = require('firebase-admin')
const serviceAccountKey = require('../serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: 'https://website-pageviews-c8d4d.firebaseio.com/',
})

const db = admin.database()

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
  // working state

  const ref = db.ref('joeprevite-dot-com/views').child(id)

  let totalViews
  await ref.once('value', snapshot => {
    const value = snapshot.val()
    console.log('what is this ', value)
    totalViews = value
  })

  console.log('here is totla views', totalViews)

  return {
    statusCode: 200,
    body: JSON.stringify({
      pageId: id,
      totalViews: 100,
    }),
  }
}
