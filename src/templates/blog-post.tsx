import { graphql, PageProps } from "gatsby"
import React from "react"
import { Container } from "theme-ui"
import App from "../components/App"
import Article from "../components/Article"
import Pager from "../components/Pager"
import { Mdx, SiteMetadata } from "../types"
import Seo from "../components/Seo"

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
      <Seo
        location={location}
        metadata={data.site.siteMetadata}
        title={data.mdx.frontmatter.title}
        description={data.mdx.excerpt}
        article={true}
      />
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
