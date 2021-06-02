import React, { FC } from 'react'
import useSWR from 'swr'
import format from 'comma-number'

import { css } from '@emotion/core'
import { bpMaxSM } from '../lib/breakpoints'
import Link from './Link'
import fetcher from '../lib/fetcher'
import { EdgeType } from '../pages/articles'

interface PostPropsType {
  post: EdgeType['node'];
}

const Post: FC<PostPropsType> = ({ post }) => {
  const { data } = useSWR(
    `/.netlify/functions/page-views?id=${post.fields.slug}`,
    fetcher,
  )

  const views = data?.totalViews

  return (
    <div
      css={css`
        :not(:first-of-type) {
          margin-top: 10px;
        }
        :first-of-type {
          margin-top: 10px;
          ${bpMaxSM} {
            margin-top: 10px;
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
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          h2,
          small {
            margin-top: 30px;
            margin-bottom: 10px;
          }
          small {
            margin-left: 10px;
            white-space: nowrap;
          }
          ${bpMaxSM} {
            flex-wrap: wrap;

            small {
              margin: 0;
            }
          }
        `}
      >
        <h2>
          <Link
            aria-label={`View ${post.frontmatter.title} article`}
            to={`/${post.fields.slug}`}
          >
            {post.frontmatter.title}
          </Link>
        </h2>
        <small>{`${
          views !== null && views !== undefined ? format(views) : '–––'
        } views`}</small>
      </div>
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
  )
}

export default Post
