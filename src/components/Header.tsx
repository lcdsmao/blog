import { Link } from "gatsby"
import React from "react"
import { Container } from "theme-ui"

import { useSiteMetadata } from "../hooks/UseSiteMetadata"
import DarkToggleButton from "./DarkToggleButton"
import Scrim from "./Scrim"

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
      <div sx={{ position: "relative", marginBottom: 5 }}>
        <Scrim
          height="88px"
          pointerEvents="none"
          sx={{ position: "absolute" }}
        />
      </div>
    </div>
  )
}

export default Header
