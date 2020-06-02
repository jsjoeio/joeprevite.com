// /**
//  * credit to @leerob who wrote this
//  * @see https://github.com/leerob/leerob.io/blob/master/lib/db-admin.js
//  */
// const admin = require('firebase-admin')

// export function getFirebaseDbAdmin() {
//   // We don't want to initializeApp twice
//   // so we check the length i.e. the number of apps
//   // if it's non-existant, we need to reinitialize
//   if (admin.apps.length === 0 || !admin.database) {
//     try {
//       admin.initializeApp({
//         credential: admin.credential.cert({
//           client_email: process.env.FIREBASE_CLIENT_EMAIL,
//           private_key: process.env.FIREBASE_PRIVATE_KEY,
//           project_id: 'website-pageviews-c8d4d',
//         }),
//         databaseURL: 'https://website-pageviews-c8d4d.firebaseio.com/',
//       })
//       return admin.database()
//       admin.app()
//     } catch (error) {
//       /*
//        * We skip the "already exists" message which is
//        * not an actual error when we're hot-reloading.
//        */
//       if (!/already exists/u.test(error.message)) {
//         // eslint-disable-next-line no-console
//         console.error('Firebase admin initialization error', error.stack)
//       }
//     }
//   }

//   return admin.database()
// }

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
