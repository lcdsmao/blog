import React from "react"
import { PageProps, graphql } from "gatsby"
import App from "../components/App"
import Container from "../components/Container"
import Article from "../components/Article"
import { SiteMetadata, MarkdownRemark } from "../types"
import Pagination from "../components/Pagination"

type Props = PageProps<
  {
    site: {
      siteMetadata: SiteMetadata
    }
    allMarkdownRemark: {
      edges: {
        node: MarkdownRemark
      }[]
    }
  },
  {
    humanPageNumber: number
    pageNumber: number
    numberOfPages: number
    previousPagePath: string
    nextPagePath: string
    skip: number
    limit: number
  }
>

const Index: React.FC<Props> = ({ data, location, pageContext }) => {
  const metadata = data.site.siteMetadata
  const articls = data.allMarkdownRemark.edges
  return (
    <App location={location} metadata={metadata}>
      <Container>
        {articls.map(({ node }) => (
          <Article key={node.fields.slug} single={false} data={node} />
        ))}

        <Pagination
          page={pageContext.humanPageNumber}
          total={pageContext.numberOfPages}
          previous={pageContext.previousPagePath || null}
          next={pageContext.nextPagePath || null}
        />
      </Container>
    </App>
  )
}

export default Index

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        social {
          twitter
          github
        }
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            tags
          }
        }
      }
    }
  }
`
