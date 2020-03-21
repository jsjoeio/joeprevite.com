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

const BUTTONDOWN_API_URL = ' https://api.buttondown.email/v1/subscribers'
const BUTTONDOWN_API_TOKEN = process.env.GATSBY_BUTTONDOWN_API_TOKEN

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

class SignUp extends React.Component {
  state = {
    submitted: false,
  }

  async handleSubmit(values) {
    const data = { ...values, referrer_url: 'https://joeprevite.com' }
    this.setState({ submitted: true })
    try {
      const response = await fetch(BUTTONDOWN_API_URL, {
        body: JSON.stringify(data),
        method: 'post',
        headers: {
          Accept: 'application/json',
          Authorization: `Token ${BUTTONDOWN_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })

      const responseJson = await response.json()

      this.setState({
        submitted: true,
        response: responseJson,
        errorMessage: null,
      })
    } catch (error) {
      this.setState({
        submitted: false,
        errorMessage: 'Something went wrong!',
      })
    }
  }

  render() {
    const { submitted, response, errorMessage } = this.state
    const { theme } = this.props
    const successful = response && response.creation_date

    return (
      <div>
        {!successful && (
          <>
            <h2>Join the Newsletter</h2>
            <p
              css={css`
                margin-bottom: ${rhythm(1)};
                margin-top: 0;
              `}
            >
              I send an email or two per month to share things I'm excited about.
              I'd be delighted if you signed up.
            </p>
          </>
        )}
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={SubscribeSchema}
          onSubmit={values => this.handleSubmit(values)}
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
                      placeholder="lukeskywalker@gmail.com"
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
                    {!isSubmitting && 'Submit'}
                    {isSubmitting && 'Submitting...'}
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
                  Thanks for signing up! After confirming , you'll start
                  receiving the newsletter goods!
                </p>
              )}
            </>
          )}
        </Formik>
      </div>
    )
  }
}

export default withTheme(SignUp)
