import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { lighten } from 'polished'
import { css } from '@emotion/core'
import { useTheme } from '../Theming'
import { bpMaxSM } from '../../lib/breakpoints'
// import MobileMenu from './MobileMenu'
import ThemeToggler from './ThemeToggler'
// import Links from './Links'
import { Logo } from './Logo'

import Container from '../Container'

const Header = ({ siteTitle, siteTitleShort }) => {
  const theme = useTheme()
  return (
    <header
      css={css`
        width: 100%;
        flex-shrink: 0;
        background: none;
        padding: 20px 0;
        background: ${theme.colors.headerBg};
      `}
    >
      <Container noVerticalPadding>
        <nav
          css={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <Link
            to="/"
            aria-label="go to homepage"
            css={css`
              color: ${theme.colors.text};
              &:hover {
                color: ${lighten(0.25, theme.colors.text)};
                text-decoration: none;
              }
            `}
          >
            <Logo title={siteTitle} siteTitleShort={siteTitleShort} />
          </Link>
          <div
            css={css`
              font-size: 16px;
              line-height: 1.25;
              display: flex;
              align-items: center;
              a {
                text-decoration: none;
                color: ${theme.colors.white};
                margin-left: 16px;
                margin-right: 16px;
              }
              .active {
                display: none;
                visibility: hidden;
              }
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                // Leaving this in just in case
                // ${bpMaxSM} {
                //   display: none;
                // }
              `}
            >
              <ThemeToggler
                css={{}}
                toggleTheme={theme.toggleTheme}
                themeName={theme.themeName}
              />
              {/* Keeping Links just in case */}
              {/* <Links /> */}
            </div>
            {/* Keeping MobileMenu here just in case */}
            {/* <MobileMenu>
              <Links />
            </MobileMenu> */}
          </div>
        </nav>
      </Container>
    </header>
  )
}

const ConnectedHeader = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            titleShort
          }
        }
      }
    `}
    render={data => (
      <Header
        siteTitle={data.site.siteMetadata.title}
        siteTitleShort={data.site.siteMetadata.titleShort}
        {...props}
      />
    )}
  />
)

export default ConnectedHeader
