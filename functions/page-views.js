exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing "id" query parameter',
      }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      pageId: id,
      totalViews: 100,
    }),
  }
}
