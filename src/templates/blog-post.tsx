import { PageProps, graphql } from "gatsby"
import React from "react"

import Article from "../components/Article"
import Pager from "../components/Pager"
import Seo from "../components/Seo"
import { Mdx } from "../types"

type Props = PageProps<
  {
    mdx: Mdx
  },
  {
    slug: string
    previous: Mdx
    next: Mdx
  }
>

const BlogPostTemplate: React.FC<Props> = ({ location, data, pageContext }) => {
  const article = data.mdx
  const { previous, next } = pageContext
  return (
    <>
      <Seo
        location={location}
        title={data.mdx.frontmatter.title}
        description={data.mdx.excerpt}
        article={true}
      />
      <Article single data={article} />
      <Pager previous={previous} next={next} />
    </>
  )
}

export default BlogPostTemplate

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt
      frontmatter {
        title
        tags
        date(formatString: "MMM DD, YYYY")
      }
    }
  }
`
