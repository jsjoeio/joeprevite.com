import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { css } from '@emotion/core'
import { withTheme } from '../Theming'
import { rhythm } from '../../lib/typography'
import { bpMaxSM } from '../../lib/breakpoints'
import Message from '../ConfirmMessage/Message'
import Button from '../Header/Button'
import { PleaseConfirmIllustration } from '../ConfirmMessage/Illustrations'

const SubscribeSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
})

const PostSubmissionMessage = ({ response }) => {
  return (
    <div>
      <Message
        illustration={PleaseConfirmIllustration}
        title={`Great, one last thing...`}
        body={`I just sent you an email with the confirmation link.
          **Please check your inbox!**`}
      />
    </div>
  )
}

export const CallToActionDescription = ({ children }) => {
  return (
    <div
      css={css`
        margin-bottom: ${rhythm(1)};
        margin-top: 0;
      `}
    >
      {children}
    </div>
  )
}

const PlainCallToActionDescription = ({ description }) => {
  return (
    <p
      css={css`
        margin-bottom: ${rhythm(1)};
        margin-top: 0;
      `}
    >
      {description}
    </p>
  )
}

function CallToAction({
  theme,
  formId,
  title,
  children, // only used if description === ''
  description,
  buttonText = 'Sign me up!',
  buttonLoadingText = 'Signing you up...',
  placeholderText = 'awesomeperson@gmail.com',
  tags, // the tags to add to the subscriber
}) {
  const [state, setState] = React.useState({
    submitted: false,
    response: null,
    errorMessage: '',
  })
  const successful = state.response && state.response.creation_date
  const CONVERT_KIT_URL = `https://app.convertkit.com/forms/${formId}/subscriptions`

  const { submitted, response, errorMessage } = state

  // Gets the current url to save when subscribing user
  const referrer = () =>
    typeof window !== 'undefined' ? window.location.href : ''

  async function handleSubmit(values) {
    const referrerUrl = referrer()
    // values is an object that has the email field on it
    // TODO fix tags not working
    const data = {
      email_address: values.email,
      tags,
      referrer: referrerUrl,
    }
    setState({ ...state, submitted: true })
    try {
      const response = await fetch(CONVERT_KIT_URL, {
        body: JSON.stringify(data, null, 2),
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      const responseJson = await response.json()

      setState({
        submitted: true,
        response: responseJson,
        errorMessage: null,
      })
    } catch (error) {
      setState({
        ...state,
        submitted: false,
        errorMessage: 'Something went wrong!',
      })
    }
  }

  return (
    <div className="call-to-action">
      {!successful && (
        <>
          <h2>{title}</h2>
          {description ? (
            <PlainCallToActionDescription description={description} />
          ) : (
            { children }
          )}
        </>
      )}
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={SubscribeSchema}
        onSubmit={values => handleSubmit(values)}
      >
        {({ errors, touched, isSubmitting }) => (
          <>
            {!successful && (
              <Form
                css={css`
                  display: flex;
                  align-items: flex-end;
                  button {
                    margin-left: 10px;
                    white-space: nowrap;
                  }
                  .field-error {
                    display: block;
                    color: ${theme.colors.red};
                    font-size: 80%;
                  }
                  input,
                  label {
                    width: 100%;
                  }
                  ${bpMaxSM} {
                    flex-direction: column;
                    align-items: flex-start;
                    width: auto;
                    label,
                    input {
                      margin: 5px 0 0 0 !important;
                      width: 100%;
                      display: flex;
                      flex-direction: column;
                    }
                    button {
                      margin: 20px 0 0 0;
                    }
                  }
                `}
              >
                <label htmlFor="email">
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
                      align-items: flex-end;
                    `}
                  >
                    Email
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="field-error"
                    />
                  </div>
                  <Field
                    aria-label="your email address"
                    aria-required="true"
                    name="email"
                    id="email"
                    placeholder={placeholderText}
                    type="email"
                  />
                </label>
                <Button
                  data-element="submit"
                  type="submit"
                  disabled={isSubmitting}
                  css={css`
                    box-sizing: border-box;
                    margin-bottom: 0.5rem;
                    padding: 6px 15px;
                  `}
                >
                  {!isSubmitting && buttonText}
                  {isSubmitting && buttonLoadingText}
                </Button>
              </Form>
            )}
            {submitted && !isSubmitting && (
              <PostSubmissionMessage response={response} />
            )}
            {errorMessage && <div>{errorMessage}</div>}
            {successful && (
              <p
                css={css`
                  margin: 0;
                `}
              >
                Thanks for signing up! After confirming , you'll start receiving
                the newsletter goods!
              </p>
            )}
          </>
        )}
      </Formik>
    </div>
  )
}

export default withTheme(CallToAction)
