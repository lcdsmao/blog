import React from "react"
import { Link } from "gatsby"
import { Mdx } from "../types"
import { MDXRenderer } from "gatsby-plugin-mdx"

type Props = {
  single: Boolean
  data: Mdx
}

const Article: React.FC<Props> = ({ single, data }) => {
  return (
    <article>
      <header>
        {single ? (
          <h1>{data.frontmatter.title}</h1>
        ) : (
          <h2>
            <Link to={data.fields.slug}>{data.frontmatter.title}</Link>
          </h2>
        )}
      </header>

      <p>
        <time dateTime={data.frontmatter.date}>{data.frontmatter.date}</time>
      </p>

      {single ? <MDXRenderer>{data.body}</MDXRenderer> : <p>{data.excerpt}</p>}
    </article>
  )
}

export default Article
