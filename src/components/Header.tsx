import { Link } from "gatsby"
import React from "react"

import { SiteMetadata } from "../types"
import DarkToggleButton from "./DarkToggleButton"

type Props = {
  isHome: boolean
  metadata: SiteMetadata
}

const Header: React.FC<Props> = ({ isHome, metadata }) => {
  return (
    <div
      sx={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginTop: [2, 3],
        gap: 3,
        a: {
          variant: "textStyles.heading",
        },
      }}
    >
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "inherit",
          alignItems: "inherit",
        }}
      >
        <Link
          to="/"
          sx={{
            fontSize: 4,
            width: ["100%", "auto"],
          }}
        >
          {metadata.title}
        </Link>
        <a href={`https://github.com/${metadata.social.github}`}>Github</a>
        <a href={`https://twitter.com/${metadata.social.twitter}`}>Twitter</a>
      </div>
      <DarkToggleButton />
    </div>
  )
}

export default Header
