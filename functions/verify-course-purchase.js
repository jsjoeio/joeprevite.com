const fetch = require('node-fetch')
const ZIP_NAME = 'fake-course.zip'
const DOWNLOAD_LINK = `https://raw.githubusercontent.com/jsjoeio/install-scripts/main/${ZIP_NAME}`

async function verifyFlurlyPayment(paymentId) {
  const FLURLY_API_ENDPOINT = `https://flurly.com/api/verify_redirect/${paymentId}`
  const response = await fetch(FLURLY_API_ENDPOINT)
  // false: comes back like this {"statusCode":500,"message":"Incorrect CheckoutSession ID."}
  // true: comes back like this {"payment_status":"paid"}
  const json = await response.json()
  console.log(`LOG: used paymentId: ${paymentId}`)
  console.log(`LOG: Response from Flurly API: ${JSON.stringify(json)}`)

  const isValidPayment = json.payment_status && json.payment_status === 'paid'
  console.log(`LOG: Response from Flurly API: ${json}`)
  // If we don't do this, it can come back undefined
  return isValidPayment ? true : false
}

exports.handler = async (event, context) => {
  const { paymentId } = event.queryStringParameters
  if (!paymentId) {
    console.error('ERROR: Request made without paymentId')
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing "paymentId" query parameter. Cannot verify purchase.',
      }),
    }
  }

  const isValidPaymentId = await verifyFlurlyPayment(paymentId)

  if (!isValidPaymentId) {
    console.error(`ERROR: paymentId ${paymentId} came back invalid`)
    return {
      statusCode: 403,
      body: JSON.stringify({
        error:
          'ERROR: could not verify purchase. Please contact joe at joe previte [dot com]',
        paymentId,
      }),
    }
  }

  console.log(
    `LOG: Successfully verified paymentId ${paymentId} and sent download link`,
  )
  return {
    statusCode: 200,
    body: JSON.stringify({
      verified: isValidPaymentId,
      downloadLink: DOWNLOAD_LINK,
    }),
  }
}
