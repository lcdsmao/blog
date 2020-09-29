import React from "react"
import { graphql } from "gatsby"

export default function Home({ data }) {
  return (
    <div>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <h3>{node.fileAbsolutePath}</h3>
      ))}
    </div>
  )
}

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            date
            tags
            title
          }
          fileAbsolutePath
        }
      }
    }
  }
`
