import React from "react"
import { graphql, PageProps } from "gatsby"
import { SiteMetadata, MarkdownRemark } from "../types"
import Container from "../components/Container"
import Article from "../components/Article"

type Props = PageProps<
  {
    site: {
      siteMetadata: SiteMetadata
    }
    markdownRemark: MarkdownRemark
  },
  {
    slug: string
    previous: MarkdownRemark
    next: MarkdownRemark
  }
>

const BlogPostTemplate: React.FC<Props> = ({ location, data, pageContext }) => {
  const metadata = data.site.siteMetadata
  const article = data.markdownRemark
  const { previous, next } = pageContext
  return (
    <div>
      <Container>
        <Article single data={article} />
      </Container>
    </div>
  )
}

export default BlogPostTemplate

export const query = graphql`
  query($slug: String!) {
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        tags
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`
