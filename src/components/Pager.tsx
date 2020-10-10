import React from "react"
import { Link } from "gatsby"
import { MarkdownRemark } from "../types"
/** @jsx jsx */
import { jsx } from "theme-ui"

const PreviousOrNextButton: React.FC<{
  isPrevious: Boolean
  node: MarkdownRemark | null
}> = ({ isPrevious, node }) => {
  const paddingKey = isPrevious ? "paddingLeft" : "paddingRight"
  return (
    <div
      sx={{
        flex: 1,
        textAlign: isPrevious ? "end" : "start",
        marginTop: 1,
        [paddingKey]: 1,
        alignItems: "stretch",
      }}
    >
      {node ? (
        <Link
          sx={{
            "& span": {
              position: "relative",
              display: "block",
            },
          }}
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
      sx={{
        display: "flex",
      }}
    >
      <PreviousOrNextButton isPrevious={false} node={next} />
      <PreviousOrNextButton isPrevious={true} node={previous} />
    </nav>
  )
}

export default Pager
