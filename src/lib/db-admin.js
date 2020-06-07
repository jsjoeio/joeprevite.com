const { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env
const admin = require('firebase-admin')

// Due to the way the key is provided by Netlify
// in production, we need to use the ternary
const config = {
  credential: admin.credential.cert({
    client_email: FIREBASE_CLIENT_EMAIL,
    private_key:
      FIREBASE_PRIVATE_KEY[0] === '-'
        ? FIREBASE_PRIVATE_KEY
        : JSON.parse(FIREBASE_PRIVATE_KEY),
    project_id: 'website-pageviews-c8d4d',
  }),
  databaseURL: 'https://website-pageviews-c8d4d.firebaseio.com/',
}

export default !admin.apps.length ? admin.initializeApp(config) : admin.app()
