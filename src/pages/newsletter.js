import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Container from '../components/Container'
import CallToAction from '../components/Forms/CallToAction'

export default ({ data: { site } }) => (
  <Layout site={site} noFooter>
    <Container>
      <CallToAction
        formId="1652705"
        title="Join the Newsletter"
        description="I send a couple emails per month related to programming and learning. I also share goodies and deals here."
        placeholderText="awesomeperson@gmail.com"
        tags={['general-newsletter']}
      />
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
