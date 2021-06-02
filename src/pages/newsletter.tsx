import React from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/Layout'
import Container from '../components/Container'
import CallToAction from '../components/Forms/CallToAction'
import SEO from '../components/SEO'
import { NewsletterPageQuery } from '../types/generated'

const NewsletterPage = ({ data: { site } }: PageProps<NewsletterPageQuery>) => (
  <Layout site={site} noFooter>
    <SEO />
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

export default NewsletterPage;

export const pageQuery = graphql`
  query NewsletterPage {
    site {
      ...site
    }
  }
`
