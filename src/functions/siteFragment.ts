import { graphql } from 'gatsby';

export const siteFragment = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author {
        name
      }
      keywords
    }
  }
`