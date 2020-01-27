import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { useTheme } from 'components/Theming'
import Container from 'components/Container'
import { rhythm, scale } from '../lib/typography'
import HandWave from 'components/HandWave'

/**
 * @param date {Date}
 * @description returns "Happy {weekday}!"
 */
function getDayGreeting(date) {
  // Get date
  const currentDate = new Date(date)
  // Returns day such as "Monday"
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
    currentDate,
  )
  return `Happy ${day}!`
}

const Hero = () => {
  const theme = useTheme()
  const date = new Date()

  return (
    <section
      css={css`
        color: ${theme.colors.text};
        width: 100%;
        padding: 0;
        display: flex;
      `}
    >
      <Container
        css={css`
          display: flex;
          flex-direction: column;
          padding-bottom: 0;
        `}
      >
        <p
          css={css`
            color: ${theme.colors.text};
            position: relative;
            z-index: 5;
            line-height: 1.5;
            margin-bottom: ${rhythm(0.15)};
            max-width: ${rhythm(15)};
            font-weight: 500;
            ${scale(0.45)};
          `}
        >
          {getDayGreeting(date)} <HandWave />
        </p>
        <p>
          My name's Joe and I like getting people excited to learn, particularly
          about software development.
        </p>
      </Container>
      <div
        css={css`
          height: 150px;
          overflow: hidden;
        `}
      />
    </section>
  )
}

export default function Index({ data: { site, allMdx } }) {
  const theme = useTheme()
  return (
    <Layout site={site}>
      <Hero />
      <Container
        css={css`
          padding-bottom: 0;
        `}
      >
        <h2
          css={css`
            margin-top: 0;
          `}
        >
          Latest Articles
        </h2>
        <p>
          I love sharing what I learn. Here are some things I’ve written lately:
        </p>
        {allMdx.edges.map(({ node: post }) => (
          <div
            key={post.id}
            css={css`
              margin-bottom: 40px;
            `}
          >
            <h3
              css={css({
                marginBottom: rhythm(0.3),
                transition: 'all 150ms ease',
                ':hover': {
                  color: theme.colors.primary,
                },
              })}
            >
              <Link
                to={post.frontmatter.slug}
                aria-label={`View ${post.frontmatter.title}`}
              >
                {post.frontmatter.title}
              </Link>
            </h3>
          </div>
        ))}
        <Link to="/articles" aria-label="Visit articles page">
          <span role="img" aria-label="finger pointing to text">
            👉
          </span>{' '}
          See all articles
        </Link>
        <hr />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            slug
            keywords
          }
        }
      }
    }
  }
`
