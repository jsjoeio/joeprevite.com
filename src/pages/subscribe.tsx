import React, { FC } from 'react'
import { graphql } from 'gatsby'
import Layout, { LayoutPropsType } from '../components/Layout'
import Container from '../components/Container'
import Subscribe from '../components/Forms/Subscribe'
import SEO from '../components/SEO'
import { PageType } from '../types/PageType'

const SubscribePage: FC<PageType> = ({ data: { site } }) => (
  <Layout site={site} noFooter>
    <SEO />
    <Container>
      <Subscribe />
    </Container>
  </Layout>
)

export default SubscribePage;

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
  }
`
