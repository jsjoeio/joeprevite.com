import React from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/Layout'
import Container from '../components/Container'
import SEO from '../components/SEO'
import RevueNewsletter from '../components/Forms/RevueNewsletter'
import { NewsletterPageQuery } from '../types/generated'

const NewsletterPage = ({ data: { site } }: PageProps<NewsletterPageQuery>) => (
  <Layout site={site} noFooter>
    <SEO />
    <Container>
      <RevueNewsletter />
    </Container>
  </Layout>
)

export default NewsletterPage

export const pageQuery = graphql`
  query NewsletterPage {
    site {
      ...site
    }
  }
`
