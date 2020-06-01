import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Container from 'components/Container'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Post from '../components/Post'

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
            margin-top: 10px;
            width: 100%;
          `}
        >
          <input
            aria-label="article search"
            type="text"
            id="filter"
            placeholder="Type to filter articles..."
            onChange={handleInputChange}
            css={css`
              margin-top: 0;
              width: 90%;
            `}
          />
          <span
            css={css`
              font-weight: bold;
              text-align: center;
              width: 10%;
            `}
          >
            {posts.length}
          </span>
        </div>
        {posts.map(({ node: post }) => (
          <Post key={post.id} post={post} />
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
            slug
            keywords
          }
        }
      }
    }
  }
`
