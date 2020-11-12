import { graphql, Link, PageProps } from "gatsby"
import React from "react"
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
  { tag: string }
>

const TagTemplate: React.FC<Props> = ({ data, location, pageContext }) => {
  const articles = data.allMdx.edges
  return (
    <>
      <Head
        location={location}
        title={`Tag ${pageContext.tag}`}
        description={`Posts with tag ${pageContext.tag}`}
      />
      <h1
        sx={{
          "&:before": {
            content: '"#"',
          },
        }}
      >
        {pageContext.tag}
      </h1>
      <ul sx={{ listStyle: "none", p: 0, m: 0 }}>
        {articles.map(({ node }) => (
          <li
            key={node.fields.slug}
            sx={{
              display: "inline",
            }}
          >
            <h4 sx={{ marginBottom: 0 }}>
              <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
            </h4>
            <p sx={{ opacity: 0.5, marginTop: 0 }}>{node.frontmatter.date}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TagTemplate

export const query = graphql`
  query($tag: String!) {
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
  }
`
