/**
 * credit to @leerob who wrote this
 * @see https://github.com/leerob/leerob.io/blob/master/lib/db-admin.js
 */
const admin = require('firebase-admin')

export function getFirebaseDbAdmin() {
  // We don't want to initializeApp twice
  // so we check the length i.e. the number of apps
  // if it's non-existant, we need to reinitialize
  if (admin.apps.length === 0 || !admin.database) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          private_key: process.env.FIREBASE_PRIVATE_KEY,
          project_id: 'website-pageviews-c8d4d',
        }),
        databaseURL: 'https://website-pageviews-c8d4d.firebaseio.com/',
      })
      return admin.database()
    } catch (error) {
      /*
       * We skip the "already exists" message which is
       * not an actual error when we're hot-reloading.
       */
      if (!/already exists/u.test(error.message)) {
        // eslint-disable-next-line no-console
        console.error('Firebase admin initialization error', error.stack)
      }
    }
  }

  return admin.database()
}
