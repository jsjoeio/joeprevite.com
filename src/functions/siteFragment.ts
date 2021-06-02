import { graphql } from 'gatsby';

graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author {
        name
      }
    }
  }
`