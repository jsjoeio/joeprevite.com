import React from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/Layout'
import Container from '../components/Container'
import Subscribe from '../components/Forms/Subscribe'
import SEO from '../components/SEO'
import { SubscribePageQuery } from '../types/generated'
import RevueNewsletter from '../components/Forms/RevueNewsletter'

const SubscribePage = ({ data: { site } }: PageProps<SubscribePageQuery>) => (
  <Layout site={site} noFooter>
    <SEO />
    <Container>
      <h2>Join the Newsletter</h2>
      <RevueNewsletter />
    </Container>
  </Layout>
)

export default SubscribePage

export const pageQuery = graphql`
  query SubscribePage {
    site {
      ...site
    }
  }
`
