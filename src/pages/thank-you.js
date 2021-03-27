import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Container from '../components/Container'
import SEO from '../components/SEO'

// Thank you to these folks
// https://staxmanade.com/CssToReact/
// https://www.dannyguo.com/blog/how-to-add-copy-to-clipboard-buttons-to-code-blocks-in-hugo/

const SCRIPT_LOCATION = 'https://joeprevite.com/download-course.sh'
const SCRIPT_RAW_LOCATION =
  'https://raw.githubusercontent.com/jsjoeio/install-scripts/main/install.sh'

const CopyCodeButton = ({ code }) => {
  const [isCopied, setIsCopied] = React.useState(false)

  function handleOnClick(e) {
    // Prevents React from resetting its properties:
    // https://reactjs.org/docs/legacy-event-pooling.html
    e.persist()
    if (
      typeof navigator !== 'undefined' &&
      typeof navigator.clipboard !== 'undefined'
    ) {
      // Removes focus around button
      e.currentTarget.blur()
      navigator.clipboard.writeText(code).then(
        () => {
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 2000)
        },
        () => {
          console.error('ERROR: could not copy to clipboard')
        },
      )
    }
  }
  return (
    <button
      onClick={e => handleOnClick(e)}
      style={{
        color: '#061424',
        backgroundColor: '#FFF',
        borderColor: '#061424',
        border: '2px solid',
        borderRadius: '3px 3px 0px 0px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: '0',
        marginBottom: '-2px',
        padding: '3px 8px',
        fontSize: '0.8em',
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#F2F2F2',
        },
        '&:focus': {
          backgroundColor: '#E6E6E6',
          outline: '0',
        },
        '&:active': {
          backgroundColor: '#D9D9D9',
        },
      }}
    >{`Cop${isCopied ? 'ied!' : 'y'}`}</button>
  )
}

const CodeBlock = ({ code }) => (
  <div>
    <CopyCodeButton code={code} />
    <pre>
      <pre
        className="prism-code language-shell"
        style={{
          color: 'rgb(197, 205, 211)',
          backgroundColor: 'rgb(27, 41, 50)',
          padding: '20px',
          margin: 0,
        }}
      >
        <div className="token-line" style={{ color: 'rgb(197, 205, 211)' }}>
          <span className="token plain">{code}</span>
        </div>
      </pre>
    </pre>
  </div>
)

function getQueryParams(queryString) {
  const urlParams = new URLSearchParams(queryString)
  const paymentId = urlParams.get('paymentId')
  return paymentId
}

export default ({ data: { site } }) => {
  const [paymentId, setPaymentId] = React.useState('')
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const paymentId = getQueryParams(window.location.search)
      setPaymentId(paymentId)
      setError(null)
    }
    if (!paymentId) {
      setError(
        `paymentId was not found in the URL. Please check the URL. It should have "?paymentId" in it. If it doesn't and you purchased the course, please DM @jsjoeio on Twitter.`,
      )
    }
  }, [paymentId])

  const DOWNLOAD_COURSE_CODE_DRY_RUN = `curl -fsSL ${SCRIPT_LOCATION} | sh -s -- --dry-run`
  const DOWNLOAD_COURSE_CODE = `curl -fsSL ${SCRIPT_LOCATION} | sh -s -- --paymentId ${paymentId}`

  return (
    <Layout site={site} noFooter>
      <SEO title="Thank You | Joe Previte" />
      <Container>
        <h1>Thank you!</h1>
        <p>
          Thanks for buying my course! I am so excited to help you learn through
          hands-on activities. It's going to be a lot of fun{' '}
          <span role="img" aria-labelledby="Smiling face, eyes closed emoji">
            😄
          </span>
        </p>
        <h2>Downloading course</h2>
        <p>
          I use a script to deliver the course. There is a dry run option so you
          can see what the script does before executing it. Run that first:
        </p>
        <CodeBlock code={DOWNLOAD_COURSE_CODE_DRY_RUN} />

        <p>Once you're ready to download the course, run this:</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <CodeBlock code={DOWNLOAD_COURSE_CODE} />
        <h2>F.A.Q.</h2>
        <h3>Can I see the raw code of the script?</h3>
        <p>
          Yup! Click{' '}
          <a href={SCRIPT_RAW_LOCATION} target="_blank" rel="noreferrer">
            this link
          </a>
          (opens in a new tab) and it will show you the script code.
        </p>
        <h3>
          I'm not familiar with scripting. Can you summarize what the script
          does?
        </h3>
        <div>
          <p>Of course! Here is what it does:</p>
          <ol>
            <li>
              Verifies your purchase using the Flurly API and your payment ID
            </li>
            <li>Downloads the course zip file</li>
            <li>Unzips the file</li>
            <li>Deletes the zip file</li>
          </ol>
        </div>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
  }
`
