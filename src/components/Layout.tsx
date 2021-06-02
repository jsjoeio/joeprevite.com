import React, { Fragment, useState, useEffect, FC } from 'react'
import Helmet from 'react-helmet'
import { graphql, PageProps } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { lighten } from 'polished'
import { Global, css } from '@emotion/core'
import { ThemeName, ThemeProvider, themes, ThemeType } from './Theming'
import { bpMaxSM } from '../lib/breakpoints'
import mdxComponents from './mdx'
import Header from './Header'
import reset from '../lib/reset'
import config from '../../config/website'
import Footer from './Footer'
import { NewsletterPageQuery, OpenPageQuery, SubscribePageQuery } from '../types/generated'
import { siteFragment } from '../functions/siteFragment'

const getGlobalStyles = (theme: ThemeType) => {
  return css`
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
      background: ${theme.colors.bodyBg};
      color: ${theme.colors.text};
    }
    &::selection {
      color: ${theme.colors.white};
      background-color: ${theme.colors.primary};
    }
    a {
      color: ${theme.colors.link};
      text-decoration: none;
      &:hover,
      &:focus {
        color: ${theme.colors.link};
      }
      &:hover {
        text-decoration: underline;
      }
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${theme.colors.text};
      position: relative;
      &:hover {
        .remark-header-link {
          visibility: visible;
        }
      }
    }
    ${bpMaxSM} {
      p,
      em,
      strong {
        font-size: 90%;
      }
      h1 {
        font-size: 30px;
      }
    }
    hr {
      margin: 50px 0;
      border: none;
      border-top: 1px solid ${theme.colors.gray};
      background: none;
    }
    em {
      font-weight: 400;
      font-style: italic;
    }
    strong {
      em {
        font-weight: 500;
        font-style: italic;
      }
    }
    input {
      border-radius: 4px;
      border: 1px solid ${theme.colors.gray};
      padding: 5px 10px;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
      font-weight: 400;
      margin-top: 5px;
      ::placeholder {
        opacity: 0.4;
      }
      &:focus {
        border-color: ${theme.colors.link};
        box-shadow: ${theme.colors.link} 0px 0px 0px 1px;
      }
    }
    .gatsby-resp-image-image {
      background: none !important;
      box-shadow: 0;
    }
    button {
      border-radius: 4px;
      background-color: ${theme.colors.primary};
      border: none;
      color: ${theme.colors.white};
      padding: 5px 10px;
      cursor: pointer;
      border: 1px solid ${theme.colors.primary};
      transition: all 150ms;
      &:hover {
        background: ${lighten(0.05, theme.colors.primary)};
        border: 1px solid ${lighten(0.05, theme.colors.primary)};
      }
    }
    pre {
      background-color: #061526 !important;
      border-radius: 4px;
      font-size: 16px;
      padding: 10px;
      overflow-x: auto;
      /* Track */
      ::-webkit-scrollbar {
        width: 100%;
        height: 5px;
        border-radius: 0 0 5px 5px;
      }
      ::-webkit-scrollbar-track {
        background: #061526;
        border-radius: 0 0 4px 4px;
        border: 1px solid rgba(0, 0, 0, 0.2);
      }
      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
      }
    }
    kbd {
      background-color: #eee;
      border-radius: 3px;
      border: 1px solid #b4b4b4;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
        0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
      color: ${theme.colors.black};
      display: inline-block;
      font-size: 0.85em;
      font-weight: 700;
      line-height: 1;
      padding: 2px 4px;
      white-space: nowrap;
    }
    .highlight-line {
      background-color: rgb(53, 59, 69);
      display: block;
      margin-right: -1em;
      margin-left: -1em;
      padding-right: 1em;
      padding-left: 0.75em;
      border-left: 0.3em solid #f99;
    }
    .remark-header-link {
      position: absolute;
      left: -20px;
      visibility: hidden;

      /* Show but hide icon on mobile */
      ${bpMaxSM} {
        visibility: visible;
        left: 0;
        svg {
          visibility: hidden;
        }
      }
    }
    details {
      display: block;
    }
    summary {
      display: list-item;
    }
    small {
      color: ${lighten(0.35, theme.colors.black)};
    }
    .contains-task-list {
      /* Don't show bullets for task lists */
      list-style: none;
    }
  `
}

export interface LayoutPropsType {
  site: {
    siteMetadata: {
      description: string;
      keywords: string[];
      author: {
        name: string;
      }
    }
  }
  frontmatter?: {
    description?: string;
    keywords?: string[];
  }
  noFooter?: boolean;
  noSubscribeForm?: boolean;
}

export type LayoutPropsType2 = {
  site:
    | PageProps<NewsletterPageQuery>['data']['site']
    | PageProps<OpenPageQuery>['data']['site']
    | PageProps<SubscribePageQuery>['data']['site'];
  frontmatter?: {
    description?: string;
    keywords?: string[];
  }
  noFooter?: boolean;
  noSubscribeForm?: boolean;
}

const Layout: FC<LayoutPropsType2> = ({
  site,
  frontmatter = {},
  children,
  noFooter = false,
  noSubscribeForm,
}) => {
  const initializeTheme = (): ThemeName => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as ThemeName || 'default'
    } else {
      return 'default'
    }
  }

  const [themeName, setTheme] = useState(initializeTheme)

  useEffect(() => {
    localStorage.setItem('theme', themeName)
  }, [themeName])

  const toggleTheme = (name: ThemeName) => setTheme(name)
  const theme = {
    ...themes[themeName],
    toggleTheme: toggleTheme,
  }
  const siteDescription = site?.siteMetadata?.description;
  // @ts-expect-error
  const siteKeywords = site?.siteMetadata?.keywords;

  const {
    keywords: frontmatterKeywords,
    description: frontmatterDescription,
  } = frontmatter

  const keywords = (frontmatterKeywords || siteKeywords).join(', ')
  const description = frontmatterDescription || siteDescription
  const authorName = site?.siteMetadata?.author?.name;

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Global styles={reset()} />
        <Global styles={getGlobalStyles(theme)} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: 100vh;
          `}
        >
          <Helmet
            title={config.siteTitle}
            meta={[
              { name: 'description', content: description },
              { name: 'keywords', content: keywords },
            ]}
          >
            <html lang="en" />
            <noscript>This site runs best with JavaScript enabled.</noscript>
          </Helmet>
          <Header />
          <MDXProvider components={mdxComponents}>
            <Fragment>{children}</Fragment>
          </MDXProvider>
          {!noFooter && authorName && (
            <Footer
              author={authorName}
              noSubscribeForm={noSubscribeForm}
            />
          )}
        </div>
      </Fragment>
    </ThemeProvider>
  )
}

export default Layout;

export const pageQuery = siteFragment;