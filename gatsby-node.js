const path = require('path')

const _ = require('lodash')
const paginate = require('gatsby-awesome-pagination')
const PAGINATION_OFFSET = 7
const IS_DEV_MODE = process.env.NODE_ENV === 'development'

// keep alphabetical
const VALID_TAGS = new Set([
  `Book`,
  `GitHub`,
  `JavaScript`,
  `macOS`,
  `Reason`,
  `Rust`,
  `TypeScript`,
])

/**
 * validates the tags used in content frontmatter
 * @param tags {string[]} the tags you want to validate
 * @param onError {function} the function to call if it encounters an invalid tags
 */
function validateTags(tags, onError) {
  tags.forEach(tag => {
    const doesNotHaveTag = !VALID_TAGS.has(tag)

    if (doesNotHaveTag) {
      // Call the callback
      onError()
    }
  })
}

const createPosts = (createPage, createRedirect, edges, reporter) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node
    const pagePath = node.fields.slug
    const tags = node.fields.tags

    validateTags(tags, () =>
      reporter.error(
        `Invalid tag${
          tags.length > 1 ? 's' : ''
        } "${tags}" found in post with slug: "${pagePath}"

As a reminder, these are the valid tags: ${[...VALID_TAGS]}

If this is a valid tag, please add to VALID_TAGS in /gatsby-node.js
        `,
      ),
    )

    if (node.fields.redirects) {
      node.fields.redirects.forEach(fromPath => {
        createRedirect({
          fromPath,
          toPath: pagePath,
          redirectInBrowser: true,
          isPermanent: true,
        })
      })
    }

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

const POSTS_QUERY_STRING = IS_DEV_MODE
  ? `
query {
  allMdx(
    sort: { order: DESC, fields: [frontmatter___date] }
  ) {
    edges {
      node {
        id
        parent {
          ... on File {
            name
            sourceInstanceName
          }
        }
        excerpt(pruneLength: 250)
        fields {
          title
          slug
          date
          tags
        }
      }
    }
  }
}
`
  : `
query {
  allMdx(
    filter: { frontmatter: { published: { ne: false } } }
    sort: { order: DESC, fields: [frontmatter___date] }
  ) {
    edges {
      node {
        id
        parent {
          ... on File {
            name
            sourceInstanceName
          }
        }
        excerpt(pruneLength: 250)
        fields {
          title
          slug
          date
          tags
        }
      }
    }
  }
}
`

exports.createPages = ({ actions, graphql, reporter }) =>
  graphql(POSTS_QUERY_STRING).then(({ data, errors }) => {
    if (errors) {
      return Promise.reject(errors)
    }

    if (_.isEmpty(data.allMdx)) {
      return Promise.reject('There are no posts!')
    }

    const { edges } = data.allMdx
    const { createRedirect, createPage } = actions
    createPosts(createPage, createRedirect, edges, reporter)
  })

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
        $components: path.resolve(__dirname, 'src/components'),
      },
    },
  })
}

const createPaginatedPages = (createPage, edges, pathPrefix, context) => {
  const pages = edges.reduce((acc, value, index) => {
    const pageIndex = Math.floor(index / PAGINATION_OFFSET)

    if (!acc[pageIndex]) {
      acc[pageIndex] = []
    }

    acc[pageIndex].push(value.node.id)

    return acc
  }, [])

  pages.forEach((page, index) => {
    const previousPagePath = `${pathPrefix}/${index + 1}`
    const nextPagePath = index === 1 ? pathPrefix : `${pathPrefix}/${index - 1}`

    createPage({
      path: index > 0 ? `${pathPrefix}/${index}` : `${pathPrefix}`,
      component: path.resolve(`src/templates/blog.js`),
      context: {
        pagination: {
          page,
          nextPagePath: index === 0 ? null : nextPagePath,
          previousPagePath:
            index === pages.length - 1 ? null : previousPagePath,
          pageCount: pages.length,
          pathPrefix,
        },
        ...context,
      },
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    const titleSlugged = _.join(_.drop(parent.name.split('-'), 3), '-')

    const slug =
      parent.sourceInstanceName === 'legacy'
        ? `blog/${node.frontmatter.date
            .split('T')[0]
            .replace(/-/g, '/')}/${titleSlugged}`
        : node.frontmatter.slug || titleSlugged

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    })

    createNodeField({
      name: 'published',
      node,
      value: node.frontmatter.published,
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    })

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description,
    })

    createNodeField({
      name: 'tagline',
      node,
      value: node.frontmatter.tagline,
    })

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date ? node.frontmatter.date.split(' ')[0] : '',
    })

    createNodeField({
      name: 'banner',
      node,
      value: node.frontmatter.banner,
    })

    createNodeField({
      name: 'tags',
      node,
      value: node.frontmatter.tags || [],
    })

    // TODO - validate types somewhere
    // should support: post, page, snippet
    createNodeField({
      name: 'type',
      node,
      value: node.frontmatter.type || '',
    })

    createNodeField({
      name: 'keywords',
      node,
      value: node.frontmatter.keywords || [],
    })

    createNodeField({
      name: 'redirects',
      node,
      value: node.frontmatter.redirects,
    })

    createNodeField({
      name: 'isPost',
      node,
      value: true,
    })

    createNodeField({
      name: 'editLink',
      node,
      value: `https://github.com/jsjoeio/joeprevite.com/edit/master${node.fileAbsolutePath.replace(
        __dirname,
        '',
      )}`,
    })
  }
}
