/**
 * @param date {Date}
 * @description returns "Happy {weekday}!"
 */
export function getDayGreeting(date: Date) {
  // Get date
  const currentDate = new Date(date)
  // Returns day such as "Monday"
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
    currentDate,
  )
  return `Happy ${day}!`
}
