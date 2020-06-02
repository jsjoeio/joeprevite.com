const { MY_SCRET_KEY1, MY_SCRET_KEY2 } = process.env

exports.handler = async (event, context) => {
  console.log('DEBUG: function has fired')
  console.log(JSON.stringify(process.env))
  Object.entries(process.env).forEach((key, value) => {
    console.log(`Key: ${key}\nValue: ${value}`)
  })
  return {
    statusCode: 200,
    body: JSON.stringify({
      pageId: id,
      totalViews: totalViews !== null ? totalViews : 0,
    }),
  }
}
