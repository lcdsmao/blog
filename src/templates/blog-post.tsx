import React from "react"
import { graphql, PageProps } from "gatsby"
import { SiteMetadata, Mdx } from "../types"
import Container from "../components/Container"
import Article from "../components/Article"
import App from "../components/App"
import Pager from "../components/Pager"

type Props = PageProps<
  {
    site: {
      siteMetadata: SiteMetadata
    }
    mdx: Mdx
  },
  {
    slug: string
    previous: Mdx
    next: Mdx
  }
>

const BlogPostTemplate: React.FC<Props> = ({ location, data, pageContext }) => {
  const metadata = data.site.siteMetadata
  const article = data.mdx
  const { previous, next } = pageContext
  return (
    <App location={location} metadata={metadata}>
      <Container>
        <Article single data={article} />
        <Pager previous={previous} next={next} />
      </Container>
    </App>
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
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        tags
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`
