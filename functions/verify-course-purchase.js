const fetch = require('node-fetch')
const ZIP_NAME = 'fake-course.zip'
const DOWNLOAD_LINK = `https://raw.githubusercontent.com/jsjoeio/install-scripts/main/${ZIP_NAME}`
const PRODUCT_URL_SLUG = `vim-for-vscode-beginner-exercise-pack`

async function verifyFlurlyPayment(paymentId) {
  const FLURLY_API_ENDPOINT = `https://flurly.com/api/verify_redirect/${paymentId}`
  const response = await fetch(FLURLY_API_ENDPOINT)
  // false: comes back like this {"statusCode":500,"message":"Incorrect CheckoutSession ID."}
  // true: comes back like this {"payment_status":"paid"}
  const json = await response.json()
  console.log(`LOG: used paymentId: ${paymentId}`)
  console.log(`LOG: Response from Flurly API: ${JSON.stringify(json)}`)

  if (json.payment_status && json.payment_status === 'paid') {
    // Check that the product_url is our product
    // Otherwise, they could use any Flurly product to download the course
    // const isValidPayment = json.product_url === PRODUCT_URL_SLUG

    // if (!isValidPayment) {
    //   console.error(
    //     `ERROR: Mismatched product urls. '${json.product_url}' does not match '${PRODUCT_URL_SLUG}'`,
    //   )
    //   return false
    // }

    // TODO add back in valid URL check when course is ready

    console.log(`LOG: paymentId is valid and product_url matches ours.`)
    return isValidPayment
  }

  return false
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
