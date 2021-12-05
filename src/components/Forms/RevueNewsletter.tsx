import React from 'react'
import { css } from '@emotion/core'
import { rhythm } from '../../lib/typography'
import { useTheme } from '../Theming'
import { rgba, darken } from 'polished'
import { bpMaxSM } from '../../lib/breakpoints'

const description =
  'I send a couple emails per month related to programming and learning. I also share goodies and deals here.'
const SubmitButton = () => {
  const secondary = false
  const theme = useTheme()
  const textColor = secondary ? theme.colors.primary : theme.colors.bodyBg
  const styles = css({
    display: 'inline-flex',
    boxSizing: 'border-box',
    marginBottom: '0.5rem',
    marginLeft: '10px',
    whiteSpace: 'nowrap',
    border: 'none',
    borderRadius: '4px',
    background: secondary ? rgba(theme.colors.link, 0.1) : theme.colors.link,
    color: textColor,
    padding: '6px 15px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    '@media (hover: hover)': {
      ':hover': {
        color: textColor,
        background: darken(0.1, theme.colors.link),
        border: 'none',
      },
    },
  })
  return (
    <input
      className="revue-form-actions"
      css={styles}
      type="submit"
      value="Sign me up!"
      name="member[subscribe]"
      id="member_submit"
      style={{
        width: 'auto',
      }}
    />
  )
}

const RevueNewsletter = () => {
  const theme = useTheme()

  return (
    <div>
      <p
        css={css`
          margin-bottom: ${rhythm(1)};
          margin-top: 0;
        `}
      >
        {description}
      </p>
      <div id="revue-embed" className="call-to-action">
        <form
          action="https://www.getrevue.co/profile/jsjoeio/add_subscriber"
          method="post"
          id="revue-form"
          name="revue-form"
          className="revue-form-group"
          target="_blank"
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
          <label htmlFor="member_email">
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
              `}
            >
              Email*
            </div>
            <input
              required
              className="revue-form-field"
              placeholder="awesomeperson@gmail.com"
              type="email"
              name="member[email]"
              id="member_email"
            />
          </label>
          <SubmitButton />
        </form>
        <small className="revue-form-footer block mt-2">
          By subscribing, you agree with Revue’s{' '}
          <a
            className="hover:text-blue-800 underline"
            target="_blank"
            href="https://www.getrevue.co/terms"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            className="hover:text-blue-800 underline"
            target="_blank"
            href="https://www.getrevue.co/privacy"
          >
            Privacy Policy
          </a>
          .
        </small>
      </div>
    </div>
  )
}

export default RevueNewsletter
