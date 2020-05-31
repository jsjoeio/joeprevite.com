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

  // This database has all my website page views
  // so we need to look at the specific site
  // then look at the views table which has {key: value} where key is the id for the page
  const ref = db.ref('joeprevite-dot-com/views').child(id)

  await ref.once('value', snapshot => {
    // grab the total views
    const totalViews = snapshot.val()

    return {
      statusCode: 200,
      body: JSON.stringify({
        pageId: id,
        totalViews: totalViews !== null ? totalViews : 0,
      }),
    }
  })
}
