import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { css } from '@emotion/core'
import SEO from 'components/SEO'
import Container from 'components/Container'
import Layout from '../components/Layout'
import Share from '../components/Share'
import config from '../../config/website'

export default function Post({
  data: { site, mdx },
  pageContext: { next, prev },
}) {
  const date = mdx?.frontmatter.date
  const title = mdx?.frontmatter.title
  // const banner = mdx.frontmatter.banner
  const editLink = mdx?.fields.editLink
  const slug = mdx?.frontmatter.slug
  const blogPostUrl = `${config.siteUrl}/${slug}/`

  return (
    <Layout site={site} frontmatter={mdx.frontmatter}>
      <SEO frontmatter={mdx.frontmatter} isBlogPost />
      <article
        css={css`
          width: 100%;
          display: flex;
        `}
      >
        <Container>
          <h1
            css={css`
              text-align: center;
              margin-bottom: 20px;
            `}
          >
            {title}
          </h1>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 0 auto 20px;
              h3,
              p,
              span {
                text-align: center;
                font-size: 15px;
                opacity: 0.6;
                font-weight: 400;
                font-weight: normal;
                margin: 0 5px;
              }
              h3,
              p {
                margin-bottom: 0;
              }
            `}
          >
            {date && <h3>{date}</h3>}
            <p>12,000 views</p>
          </div>
          {/* {banner && (
            <div
              css={css`
                padding: 30px;
                ${bpMaxSM} {
                  padding: 0;
                }
              `}
            >
              <Img
                sizes={banner.childImageSharp.fluid}
                alt={site.siteMetadata.keywords.join(', ')}
              />
            </div>
          )} */}
          <br />
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Container>
        {/* <SubscribeForm /> */}
      </article>
      {/*
        Shamelessly borrowed from @kentcdodds
        Source: https://github.com/kentcdodds/kentcdodds.com/blob/master/src/templates/post.js
      */}
      <Container noVerticalPadding>
        <p css={{ textAlign: 'right' }}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            // using mobile.twitter.com because if people haven't upgraded
            // to the new experience, the regular URL wont work for them
            href={`https://mobile.twitter.com/search?q=${encodeURIComponent(
              blogPostUrl,
            )}`}
          >
            Discuss on Twitter
          </a>
          <span css={{ marginLeft: 10, marginRight: 10 }}>{` • `}</span>
          <a target="_blank" rel="noopener noreferrer" href={editLink}>
            Edit post on GitHub
          </a>
        </p>
      </Container>
      <Container noVerticalPadding>
        <Share
          url={`${config.siteUrl}/${mdx.frontmatter.slug}/`}
          title={title}
          twitterHandle={config.twitterHandle}
        />
        <br />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        description
        tagline
        date(formatString: "MMMM DD, YYYY")
        author
        slug
        keywords
      }
      fields {
        editLink
      }
      body
    }
  }
`
