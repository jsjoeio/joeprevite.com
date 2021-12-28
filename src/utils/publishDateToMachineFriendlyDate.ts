function publishDateToMachineFriendlyDate(date: string) {
  return new Date(date).toISOString()
}

export default publishDateToMachineFriendlyDate
