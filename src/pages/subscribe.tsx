import React from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/Layout'
import Container from '../components/Container'
import Subscribe from '../components/Forms/Subscribe'
import SEO from '../components/SEO'
import { SubscribePageQuery } from '../types/generated'

const SubscribePage = ({ data: { site } }: PageProps<SubscribePageQuery>) => (
  <Layout site={site} noFooter>
    <SEO />
    <Container>
      <Subscribe />
    </Container>
  </Layout>
)

export default SubscribePage;

export const pageQuery = graphql`
  query SubscribePage {
    site {
      ...site
    }
  }
`
