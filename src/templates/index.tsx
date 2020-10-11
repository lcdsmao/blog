import { graphql, PageProps } from "gatsby"
import React from "react"
import { Container } from "theme-ui"
import App from "../components/App"
import Article from "../components/Article"
import Pagination from "../components/Pagination"
import { Mdx, SiteMetadata } from "../types"

type Props = PageProps<
  {
    site: {
      siteMetadata: SiteMetadata
    }
    allMdx: {
      edges: {
        node: Mdx
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
  const articls = data.allMdx.edges
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
    allMdx(
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