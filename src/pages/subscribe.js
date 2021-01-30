import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Container from '../components/Container'
import Subscribe from '../components/Forms/Subscribe'
import SEO from '../components/SEO'

export default ({ data: { site } }) => (
  <Layout site={site} noFooter>
    <SEO />
    <Container>
      <Subscribe />
    </Container>
  </Layout>
)

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
  }
`
