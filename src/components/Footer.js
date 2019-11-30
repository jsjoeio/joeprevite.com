import React from 'react'
import { css } from '@emotion/core'
import { useTheme } from './Theming'
import { bpMaxSM } from '../lib/breakpoints'
import SubscribeForm from './Forms/Subscribe'
import { Twitter, GitHub } from './Social'
import Link from './Link'
import Container from './Container'

const CODE_ORGANIZATIONS = [
  {
    link: 'https://www.freecodecamp.org/donate/',
    label: 'Help others learn to code by donating to freeCodeCamp.',
  },
  {
    link: 'http://www.blackgirlscode.com/donations.html',
    label:
      'Help increase the number of women of color in tech by donating to Black Girls Code.',
  },
  {
    link: 'https://girlswhocode.com/donate/',
    lable:
      'Help close the gender gap in technology change the image of what a programmer looks like and does by donating to Girls Who Code.',
  },
]

// Source: MDN - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntExclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

/**
 * @description gets a random link and label for an organization dedicated to helping others learn to code
 */
function getHelpOthersLearnToCodeLink() {
  const randomNum = getRandomIntExclusive(0, CODE_ORGANIZATIONS.length)
  return CODE_ORGANIZATIONS[randomNum]
}

const Footer = ({ author, noSubscribeForm }) => {
  const theme = useTheme()
  const { link, label } = getHelpOthersLearnToCodeLink()

  return (
    <footer>
      <Container
        css={css`
          padding-top: 0;
          ${bpMaxSM} {
            padding-top: 0;
          }
        `}
      >
        {!noSubscribeForm && (
          <div>
            <SubscribeForm />
            <br />
            <br />
          </div>
        )}
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <div
            css={css`
              font-size: 90%;
              opacity: 0.7;
            `}
          >
            <Link
              to={link}
              css={css`
                color: ${theme.colors.text};
                :hover {
                  color: ${theme.colors.primary};
                }
              `}
              aria-label={label}
            >
              Help others learn to code
            </Link>
          </div>
          <div>
            <Twitter />
            <GitHub />
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
