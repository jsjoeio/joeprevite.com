/**
 * credit to @leerob who wrote this
 * @see https://github.com/leerob/leerob.io/blob/master/lib/fetcher.js
 */
export default async (...args) => {
  const res = await fetch(...args)

  return res.json()
}
