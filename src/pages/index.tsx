import React from "react"
import { graphql, PageProps } from "gatsby"
import Header from "../components/Header"
import { MarkdownRemark, SiteMetadata } from "../types"

type Props = PageProps<{
  site: {
    siteMetadata: SiteMetadata
  }
  allMarkdownRemark: {
    edges: {
      node: MarkdownRemark & { fileAbsolutePath: string }
    }[]
  }
}>

const Home: React.FC<Props> = ({ data }) => {
  const metadata = data.site.siteMetadata

  return (
    <div>
      <Header metadata={metadata}></Header>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <h3>{node.fileAbsolutePath}</h3>
      ))}
    </div>
  )
}

export default Home

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
        description
        social {
          github
          twitter
        }
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            tags
            title
          }
          fileAbsolutePath
          html
        }
      }
    }
  }
`
