const admin = require('firebase-admin')
const serviceAccountKey = require('../serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert({
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    project_id: 'website-pageviews-c8d4d',
  }),
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
    console.log('from firebase db:', value)
    totalViews = value
  })

  console.log('here is total views', totalViews)

  return {
    statusCode: 200,
    body: JSON.stringify({
      pageId: id,
      totalViews: 100,
    }),
  }
}
