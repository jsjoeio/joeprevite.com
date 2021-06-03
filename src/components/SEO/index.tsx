import path from 'path'
import React, { FC } from 'react'
import Helmet from 'react-helmet'
import getSharingImage from '@jlengstorf/get-share-image'
import { StaticQuery, graphql, PageProps } from 'gatsby'
import SchemaOrg from './SchemaOrg'
import config from '../../../config/website'
import { useStaticQuery } from 'gatsby'
import { Maybe, PostQuery, SeoQuery } from '../../types/generated'
import { Defined } from '../../types/Defined'

interface FrontmatterType {
  title?: string;
  description?: string;
  tagline?: string;
  slug?: string;
  datePublished?: boolean;
}

interface SeoPropsType {
  isBlogPost?: boolean;
  postData?: {
    childMarkdownRemark?: {
      frontmatter?: FrontmatterType;
    }
  }
  frontmatter?: Maybe<Defined<PageProps<PostQuery>['data']['mdx']>['frontmatter']>
  postImage?: string | null;
}

const SEO: FC<SeoPropsType> = ({ postData, frontmatter, isBlogPost }) => {
  const { site } = useStaticQuery<SeoQuery>(graphql`
    query SEO {
      site {
        siteMetadata {
          title
          description
          canonicalUrl
          image
          author {
            name
          }
          organization {
            name
            url
            logo
          }
          social {
            twitter
            fbAppID
          }
        }
      }
    }
  `);

  const seo = site?.siteMetadata ?? {};
  const postMeta = frontmatter ?? postData?.childMarkdownRemark?.frontmatter ?? {}
  const title = isBlogPost ? postMeta.title ?? '' : config.siteTitle;
  const tagline = postMeta.tagline || 'Read more'
  const description = postMeta.description || seo.description
  const url = postMeta.slug
    ? `${seo.canonicalUrl}${path.sep}${postMeta.slug}`
    : seo.canonicalUrl
  // @ts-expect-error datePublished is not part of postMeta
  const datePublished = isBlogPost ? postMeta?.datePublished ?? false : false

  const socialImage = getSharingImage({
    title,
    tagline,
    cloudName: config.cloudinaryCloudName,
    imagePublicID: config.cloudinaryImagePublicID,
    titleFont: 'Roboto',
    titleExtraConfig: '_bold',
    taglineFont: 'Roboto',
  })

  const image = isBlogPost ? socialImage : seo.image

  return (
    <React.Fragment>
      <Helmet>
        {/* General tags */}
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {image && <meta name="image" content={image} />}

        {/* OpenGraph tags */}
        {url && <meta property="og:url" content={url} />}
        {isBlogPost ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        {image && <meta property="og:image" content={image} />}
        {seo?.social?.fbAppID && <meta property="fb:app_id" content={seo.social.fbAppID} />}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        {seo?.social?.twitter && <meta name="twitter:creator" content={seo.social.twitter} />}
        <meta name="twitter:title" content={title} />
        {description && <meta name="twitter:description" content={description} />}
        {image && <meta name="twitter:image" content={image} />}
      </Helmet>
      <SchemaOrg
        isBlogPost={isBlogPost}
        url={url}
        title={title}
        image={image}
        description={description}
        datePublished={datePublished}
        canonicalUrl={seo.canonicalUrl}
        author={seo.author}
        organization={seo.organization}
        defaultTitle={seo.title}
      />
    </React.Fragment>
  )
}

export default SEO
