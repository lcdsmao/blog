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
      }}
      {...rest}
    >
      <PageTurnLink
        type={"previous"}
        to={previous?.fields?.slug}
        title={previous?.frontmatter?.title}
        sx={{
          flex: "1 1 auto",
          marginRight: 2,
        }}
      />

      <PageTurnLink
        type={"next"}
        to={next?.fields?.slug}
        title={next?.frontmatter?.title}
        sx={{
          flex: "1 1 auto",
          marginLeft: 2,
        }}
      />
    </nav>
  )
}

export default Pager
