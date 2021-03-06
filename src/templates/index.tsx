import { PageProps, graphql } from "gatsby"
import React from "react"

import Article from "../components/Article"
import Pagination from "../components/Pagination"
import Head from "../components/Head"
import { Mdx } from "../types"

type Props = PageProps<
  {
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

const IndexPage: React.FC<Props> = ({ data, location, pageContext }) => {
  const articles = data.allMdx.edges
  return (
    <>
      <Head location={location} />
      {articles.map(({ node }) => (
        <Article
          key={node.fields.slug}
          single={false}
          data={node}
          sx={{ marginBottom: 5 }}
        />
      ))}

      <Pagination
        page={pageContext.humanPageNumber}
        total={pageContext.numberOfPages}
        previous={pageContext.previousPagePath || null}
        next={pageContext.nextPagePath || null}
      />
    </>
  )
}

export default IndexPage

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
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
            tags
            date(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
  }
`
