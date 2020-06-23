import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Container from 'components/Container'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Post from '../components/Post'
import { useTheme } from '../components/Theming'

/*

TODOS
- add correct colors (from gatsby-node)

*/

const FilterTag = ({ tag, filterTags, setFilterTags, handleTagChange }) => {
  const theme = useTheme()
  return (
    <button
      css={css`
        background-color: ${filterTags.includes(tag)
          ? theme.colors.filterTagsBgActive
          : theme.colors.filterTagsBg};
        border: 2px solid ${theme.colors.filterTagsBorder};
        color: ${theme.colors.filterTagsText};
        margin-right: 0.5rem;

        &:hover {
          border-width: 2px;
          background-color: ${filterTags.includes(tag)
            ? theme.colors.filterTagsBgActive
            : theme.colors.filterTagsBgHover};
        }
      `}
      onClick={() => {
        const newTags = getNewTags(filterTags, tag)
        setFilterTags(newTags)
        handleTagChange(newTags)
      }}
    >
      {tag}
    </button>
  )
}

// No reason to move this to another file because this
// is the only place it's being used :)
/**
 * @param currentFilterTags {string[]} the current filter tags in state
 * @param tag {string} the tag to add or remove
 */
function getNewTags(currentFilterTags, tag) {
  // Check if currentFilter tags has it
  if (currentFilterTags.includes(tag)) {
    // If it does, we remove it and return the array without it
    return currentFilterTags.filter(t => t !== tag)
  }

  // If it doesn't, we add it
  return [...currentFilterTags, tag]
}

const Articles = ({ data: { site, allMdx } }) => {
  // These are all the posts
  // see GraphQL query at bottom of file
  const allPosts = allMdx.edges

  // These are the tags that you can filter by
  // i.e. JavaScript, Rust
  const [filterTags, setFilterTags] = React.useState([])

  // This is where we store the list of posts that have been filtered
  // i.e filtered by query (text) or tags (filterTags)
  const [filteredData, setFilteredData] = React.useState(null)

  // query is used to keep track of the text filter
  const [query, setQuery] = React.useState('')

  // A helper to know if we have a query
  const hasSearchQuery = query !== ''

  // This is called when a user types inside the input field
  const handleInputChange = event => {
    // Grab the value from the input
    const currentQuery = event.target.value

    // We use currentQuery instead of query because React state upates are async
    // we need the latest version so we're not a step behind.
    // We also only want to use filteredData if it's not null
    // Otherwise, data has yet to be filtered, so we use allPosts
    const posts =
      currentQuery !== '' && filteredData !== null ? filteredData : allPosts
    handleFilteredData(currentQuery, filterTags, posts)
  }

  const handleTagChange = newTags => {
    // Similarly here, we check if we have a search query
    // and if the newTags (remember we don't want to use the state here because it comes in async)
    // and if those are true, then we use the filtered data
    // Otherwise, we use the unfiltered data
    const posts =
      hasSearchQuery && newTags.length !== 0 ? filteredData : allPosts

    handleFilteredData(query, newTags, posts)
  }

  // The main purpose of this function is to handle updates to filteredData
  // we pass in the query, the filterTags and the posts
  // We prefix it with '_' so that it doesn't conflict with the equivalent state name
  const handleFilteredData = (_query, _filterTags, posts) => {
    // We keep updatedData in the outermost scope of the function so that we can
    // update it in from within these if blocks
    let updatedData = posts
    // first filter based on tags
    if (updatedData !== null && _filterTags.length !== 0) {
      updatedData = updatedData.filter(({ node: post }) => {
        const postTags = post.fields.tags

        // We filter out posts that do not have every filterTags
        // i.e. if filterTags is ['Rust', 'JavaScript']
        // we only return posts that have both of those tags
        return _filterTags.every(tag => postTags.includes(tag))
      })
    }

    if (updatedData !== null && _query !== '') {
      updatedData = updatedData.filter(({ node: post }) => {
        const title = post.frontmatter.title || ''
        const excerpt = post.excerpt || ''

        // Here, we check if the query matches any words in the excerpt or title
        return (
          excerpt.toLowerCase().includes(query.toLowerCase()) ||
          title.toLowerCase().includes(query.toLowerCase())
        )
      })
    }

    // We then take this data and save it to state
    setFilteredData(updatedData)
  }

  // We start off by showing allPosts if there is no filteredData
  const posts = filteredData !== null ? filteredData : allPosts

  return (
    <Layout site={site}>
      <SEO />
      <Container noVerticalPadding>
        <div
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          {['Rust', 'JavaScript'].map(tag => (
            <FilterTag
              key={tag}
              tag={tag}
              filterTags={filterTags}
              setFilterTags={setFilterTags}
              handleTagChange={handleTagChange}
            />
          ))}
        </div>
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
            tags
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
