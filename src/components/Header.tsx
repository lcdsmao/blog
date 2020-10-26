import { Link } from "gatsby"
import React from "react"
import { Container } from "theme-ui"

import { useSiteMetadata } from "../hooks/UseSiteMetadata"
import DarkToggleButton from "./DarkToggleButton"

const VerticalGradient: React.FC = () => {
  return (
    <svg width="100%" height="20px">
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="gradient-mask">
          <rect width="100%" height="100%" fill="url(#gradient)" />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        mask="url(#gradient-mask)"
        sx={{
          fill: "background",
          transition: "fill .3s ease",
        }}
      />
    </svg>
  )
}

const Header: React.FC = ({ ...rest }) => {
  const metadata = useSiteMetadata()
  return (
    <div
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
      {...rest}
    >
      <div
        sx={{
          bg: "background",
          transition: "background .3s ease",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 3,
            paddingBottom: 1,
          }}
        >
          <Link to="/" sx={{ fontSize: 4 }}>
            {metadata.title}
          </Link>
          <DarkToggleButton />
        </Container>
      </div>
      <VerticalGradient />
    </div>
  )
}

export default Header
