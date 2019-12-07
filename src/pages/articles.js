import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Container from 'components/Container'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Link from '../components/Link'
import { bpMaxSM, bpMaxMD } from '../lib/breakpoints'

const Articles = ({ data: { site, allMdx } }) => {
  const allPosts = allMdx.edges

  const emptyQuery = ''

  const [state, setState] = React.useState({
    filteredData: [],
    query: emptyQuery,
  })

  const handleInputChange = event => {
    const query = event.target.value

    const posts = allPosts || []

    const filteredData = posts.filter(({ node: post }) => {
      const title = post.frontmatter.title || ''
      const excerpt = post.excerpt || ''
      return (
        excerpt.toLowerCase().includes(query.toLowerCase()) ||
        title.toLowerCase().includes(query.toLowerCase())
      )
    })

    setState({
      query,
      filteredData,
    })
  }

  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const posts = hasSearchResults ? filteredData : allPosts

  return (
    <Layout site={site}>
      <SEO />
      <Container noVerticalPadding>
        <div
          css={css`
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 100%;
          `}
        >
          <input
            type="text"
            id="filter"
            placeholder="Type to filter posts..."
            onChange={handleInputChange}
            css={css`
              margin-top: 0;
              width: 85%;
            `}
          />
          <span
            css={css`
              font-weight: bold;
              text-align: center;
              width: 5%;
            `}
          >
            {posts.length}
          </span>
        </div>
        {posts.map(({ node: post }) => (
          <div
            key={post.id}
            css={css`
              :not(:first-of-type) {
                margin-top: 60px;
                ${bpMaxMD} {
                  margin-top: 40px;
                }
                ${bpMaxSM} {
                  margin-top: 20px;
                }
              }
              :first-of-type {
                margin-top: 20px;
                ${bpMaxSM} {
                  margin-top: 20px;
                }
              }
              .gatsby-image-wrapper {
              }
              ${bpMaxSM} {
                padding: 20px;
              }
              display: flex;
              flex-direction: column;
            `}
          >
            {/* {post.frontmatter.banner && (
              <div
                css={css`
                  padding: 60px 60px 40px 60px;
                  ${bpMaxSM} {
                    padding: 20px;
                  }
                `}
              >
                <Link
                  aria-label={`View ${post.frontmatter.title} article`}
                  to={`/${post.fields.slug}`}
                >
                  <Img sizes={post.frontmatter.banner.childImageSharp.fluid} />
                </Link>
              </div>
            )} */}
            <h2
              css={css`
                margin-top: 30px;
                margin-bottom: 10px;
              `}
            >
              <Link
                aria-label={`View ${post.frontmatter.title} article`}
                to={`/${post.fields.slug}`}
              >
                {post.frontmatter.title}
              </Link>
            </h2>
            {/* <small>{post.frontmatter.date}</small> */}
            <p
              css={css`
                margin-top: 10px;
              `}
            >
              {post.excerpt}
            </p>{' '}
            <Link
              to={`/${post.fields.slug}`}
              aria-label={`view "${post.frontmatter.title}" article`}
            >
              Read Article →
            </Link>
          </div>
        ))}
        <hr
          css={css`
            margin: 50px 0;
          `}
        />
      </Container>
    </Layout>
  )
}

export default Articles

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { isPost: { eq: true } }
        frontmatter: { published: { ne: false } }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 300)
          id
          fields {
            title
            slug
            date
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            banner {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            slug
            keywords
          }
        }
      }
    }
  }
`
