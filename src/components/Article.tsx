import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import { MarkdownRemark } from "../types"
import { rhythm } from "../utils/typography"

type Props = {
  single: Boolean
  data: MarkdownRemark
}

const Article: React.FC<Props> = ({ single, data }) => {
  return (
    <article
      css={css({
        '[class*="language-"]': {
          fontSize: "initial",
          "&::selection, & ::selection": {
            background: "#cddce0",
          },
        },
        'pre[class*="language-"]': {
          marginBottom: rhythm(1),
        },
      })}
    >
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

      {single ? (
        <div dangerouslySetInnerHTML={{ __html: data.html }} />
      ) : (
        <p>{data.excerpt}</p>
      )}
    </article>
  )
}

export default Article
