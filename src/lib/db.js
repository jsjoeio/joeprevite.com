/**
 * credit to @leerob who wrote this
 * @see https://github.com/leerob/leerob.io/blob/master/lib/db.js
 */
export async function loadDb() {
  const firebase = await import('firebase/app')

  await import('firebase/database')

  try {
    firebase.initializeApp({
      databaseURL: 'https://website-pageviews-c8d4d.firebaseio.com/',
    })
  } catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
      // eslint-disable-next-line no-console
      console.error('Firebase initialization error', error.stack)
    }
  }

  return firebase.database().ref('joeprevite-dot-com/views')
}
