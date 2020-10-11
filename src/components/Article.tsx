import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { Mdx } from "../types"

type Props = {
  single: Boolean
  data: Mdx
}

const Article: React.FC<Props> = ({ single, data }) => {
  return (
    <article
      sx={{
        marginBottom: 4,
      }}
    >
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
          marginBottom: single ? 4 : 0,
        }}
      >
        <time dateTime={data.frontmatter.date}>{data.frontmatter.date}</time>
      </p>

      {single ? (
        <MDXProvider
          components={{
            a: props => (
              <a
                {...props}
                sx={{
                  color: "secondary",
                  textDecoration: "underline",
                }}
              />
            ),
          }}
        >
          <MDXRenderer>{data.body}</MDXRenderer>
        </MDXProvider>
      ) : (
        <p>{data.excerpt}</p>
      )}
    </article>
  )
}

export default Article
