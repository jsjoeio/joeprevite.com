import testConfig from '../src/lib/test'

exports.handler = async (event, context) => {
  console.log('DEBUG: function has fired')
  console.log(`this should show the private key: ${testConfig.privateKey}`)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'debugging in prod',
    }),
  }
}
