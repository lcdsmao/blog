import React from "react"

import { Mdx } from "../types"
import PageTurnLink from "./PageTurnLink"

type Props = {
  previous: Mdx | null
  next: Mdx | null
}

const Pager: React.FC<Props> = ({ previous, next, ...rest }) => {
  return (
    <nav
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
      {...rest}
    >
      {previous ? (
        <PageTurnLink
          type={"previous"}
          to={previous.fields.slug}
          title={previous.frontmatter.title}
          sx={{
            marginRight: 2,
            flex: 1,
          }}
        />
      ) : null}

      {next ? (
        <PageTurnLink
          type={"next"}
          to={next.fields.slug}
          title={next.frontmatter.title}
          sx={{
            marginLeft: 2,
            flex: 1,
          }}
        />
      ) : null}
    </nav>
  )
}

export default Pager
