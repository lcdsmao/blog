import { Link } from "gatsby"
import React from "react"
import { useSiteMetadata } from "../hooks/UseSiteMetadata"

import DarkToggleButton from "./DarkToggleButton"

const Header: React.FC = ({ ...rest }) => {
  const metadata = useSiteMetadata()
  return (
    <div
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        background: (theme) =>
          `linear-gradient(180deg, ${theme.colors.background} 60%, transparent 100%)`,
      }}
      {...rest}
    >
      <div
        sx={{
          display: "flex",
          maxWidth: "80ch",
          mx: "auto",
          alignItems: "baseline",
          justifyContent: "space-between",
          paddingTop: 3,
          paddingBottom: [4, 5],
          px: 3,
          a: {
            variant: "textStyles.heading",
          },
        }}
      >
        <div
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "inherit",
            marginRight: 3,
          }}
        >
          <Link
            to="/"
            sx={{
              fontSize: 4,
              width: ["100%", "auto"],
              marginRight: 4,
            }}
          >
            {metadata.title}
          </Link>
        </div>
        <DarkToggleButton />
      </div>
    </div>
  )
}

export default Header
