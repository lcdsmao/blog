import React from "react"
import { Container, useColorMode, Button } from "theme-ui"
import { SiteMetadata } from "../types"
import { Link } from "gatsby"

type Props = {
  isHome: boolean
  metadata: SiteMetadata
}

const Header: React.FC<Props> = ({ isHome, metadata }) => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
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

      <Button
        sx={{
          fontSize: 1,
        }}
        onClick={_ => {
          setColorMode(colorMode === "default" ? "dark" : "default")
        }}
      >
        Toggle {colorMode === "default" ? "Dark" : "Light"}
      </Button>
    </Container>
  )
}

export default Header
