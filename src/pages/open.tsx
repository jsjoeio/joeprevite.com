import React, { FC } from 'react'
import { graphql } from 'gatsby'
import useSWR from 'swr'
import Container from '../components/Container'
import SEO from '../components/SEO'
import Layout, { LayoutPropsType } from '../components/Layout'
import Link from '../components/Link'
import format from 'comma-number'

import fetcher from '../lib/fetcher'
import { PageType } from '../types/PageType'

const OpenPage: FC<PageType> = ({ data: { site } }) => {
  const { data } = useSWR(`/.netlify/functions/page-views`, fetcher)

  const totalPageViews = data?.totalViews

  return (
    <Layout site={site}>
      <SEO />
      <Container>
        <h1>Open</h1>
        <p>
          Inspired by the{' '}
          <Link to="https://www.openstartuplist.com/">
            Open Startup movement
          </Link>
          , I aim to make this website Open as well, which means it operates
          fully transparent and shares its metrics, like revenue(one day) and
          traffic.{' '}
        </p>
        <p>
          This will eventually contain stats for different things like page
          views, total words, total posts, newsletters, etc.{' '}
        </p>
        <div>
          <table>
            <tbody>
              <tr>
                <th style={{ paddingTop: '0' }}>Metric</th>
                <th style={{ paddingTop: '0' }}>Total</th>
              </tr>
              <tr>
                <td>Article Views</td>
                <td>{`${
                  totalPageViews !== null && totalPageViews !== undefined
                    ? format(totalPageViews)
                    : '–––'
                } views`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </Layout>
  )
}

export default OpenPage

export const pageQuery = graphql`
  query OpenPage {
    site {
      ...site
    }
  }
`
