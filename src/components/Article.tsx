import { Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"

import { Mdx } from "../types"

type Props = {
  single: Boolean
  data: Mdx
}

const Article: React.FC<Props> = ({ single, data, ...rest }) => {
  return (
    <article {...rest}>
      <header>
        {single ? (
          <h1
            sx={{
              marginBottom: 1,
            }}
          >
            {data.frontmatter.title}
          </h1>
        ) : (
          <h2
            sx={{
              variant: "textStyles.display",
              fontSize: [4, 5],
              marginBottom: 0,
            }}
          >
            <Link to={data.fields.slug}>{data.frontmatter.title}</Link>
          </h2>
        )}
      </header>

      <p
        sx={{
          opacity: 0.5,
          marginTop: 2,
          marginBottom: single ? 4 : 0,
        }}
      >
        <time dateTime={data.frontmatter.date}>{data.frontmatter.date}</time>
      </p>

      {single ? <MDXRenderer>{data.body}</MDXRenderer> : <p>{data.excerpt}</p>}

      <div
        sx={{
          display: "flex",
          marginTop: single ? 4 : 0,
        }}
      >
        {data.frontmatter.tags.map((tag) => (
          <Link
            key={tag}
            to={`/tags/${tag}`}
            sx={{
              marginRight: 2,
              opacity: 0.5,
              "&:hover": {
                opacity: 1,
              },
              "&::before": {
                content: '"#"',
              },
            }}
          >
            {tag}
          </Link>
        ))}
      </div>
    </article>
  )
}

export default Article
