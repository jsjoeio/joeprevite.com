// Source: https://stackoverflow.com/a/13460045/3015595
function formattedDate(d = new Date()) {
  return [d.getMonth() + 1, d.getDate(), d.getFullYear()]
    .map(n => (n < 10 ? `0${n}` : `${n}`))
    .join('/')
}

export default formattedDate
