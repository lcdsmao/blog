import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import { MarkdownRemark } from "../types"
import { rhythm } from "../utils/typography"

const PreviousOrNextButton: React.FC<{
  isPrevious: Boolean
  node: MarkdownRemark | null
}> = ({ isPrevious, node }) => {
  const paddingKey = isPrevious ? "paddingLeft" : "paddingRight"
  return (
    <div
      css={css({
        flex: 1,
        textAlign: isPrevious ? "end" : "start",
        marginTop: rhythm(1 / 4),
        [paddingKey]: rhythm(1 / 4),
        alignItems: "stretch",
      })}
    >
      {node ? (
        <Link
          css={css({
            "& span": {
              position: "relative",
              display: "block",
            },
          })}
          to={node.fields.slug}
        >
          <span>{isPrevious ? "Older Post" : "Newer Post"}</span>
          <span>{node.frontmatter.title}</span>
        </Link>
      ) : (
        <span />
      )}
    </div>
  )
}

type Props = {
  previous: MarkdownRemark | null
  next: MarkdownRemark | null
}

const Pager: React.FC<Props> = ({ previous, next }) => {
  return (
    <nav
      css={css({
        display: "flex",
      })}
    >
      <PreviousOrNextButton isPrevious={false} node={next} />
      <PreviousOrNextButton isPrevious={true} node={previous} />
    </nav>
  )
}

export default Pager
