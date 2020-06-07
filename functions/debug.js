exports.handler = async (event, context) => {
  console.log('DEBUG: function has fired')
  return {
    statusCode: 200,
    body: JSON.stringify({
      message:
        'SUCCESS! Functions are working properly if you see this message.',
    }),
  }
}
