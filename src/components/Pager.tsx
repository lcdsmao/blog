import React from "react"

import { Mdx } from "../types"
import PageTurnLink from "./PageTurnLink"

type Props = {
  previous: Mdx | null
  next: Mdx | null
}

const Pager: React.FC<Props> = ({ previous, next }) => {
  return (
    <nav
      sx={{
        display: "flex",
        gap: 4,
        marginTop: 5,
      }}
    >
      <PageTurnLink
        type={"previous"}
        to={previous?.fields?.slug}
        title={previous?.frontmatter?.title}
        sx={{
          flex: "1 1 auto",
        }}
      />

      <PageTurnLink
        type={"next"}
        to={next?.fields?.slug}
        title={next?.frontmatter?.title}
        sx={{
          flex: "1 1 auto",
        }}
      />
    </nav>
  )
}

export default Pager
