import React from "react"
import { Link } from "gatsby"
import { MarkdownRemark } from "../types"

type Props = {
  single: Boolean
  data: MarkdownRemark
}

const Article: React.FC<Props> = ({ single, data }) => {
  return (
    <article>
      <header>
        {single ? (
          <h1>{data.frontmatter.title}</h1>
        ) : (
          <h2>
            <Link to="/TODO">{data.frontmatter.title}</Link>
          </h2>
        )}
      </header>

      <p>
        <span>
          Published{" "}
          <time dateTime={data.frontmatter.date}>{data.frontmatter.date}</time>
        </span>
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
