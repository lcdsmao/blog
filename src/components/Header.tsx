import React from "react"
import { Container, useColorMode } from "theme-ui"
import { SiteMetadata } from "../types"
import { Link } from "gatsby"
import { SunIcon, MoonIcon } from "./icons"

type Props = {
  isHome: boolean
  metadata: SiteMetadata
}

const Header: React.FC<Props> = ({ isHome, metadata }) => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginTop: 5,
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
      <DarkToggle />
    </Container>
  )
}

export default Header

const DarkToggle: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode()
  if (!colorMode) {
    return null
  }
  return (
    <button
      sx={{
        background: "inherit",
        border: "none",
        p: 1,
        outline: "inherit",
        opacity: 0.7,
        "&:hover": {
          opacity: 1,
        },
      }}
      title={`Toggle ${colorMode === "default" ? "Dark" : "Light"}`}
      onClick={_ => {
        setColorMode(colorMode === "default" ? "dark" : "default")
      }}
    >
      {colorMode === "default" ? (
        <SunIcon
          sx={{
            width: "1.5rem",
            height: "1.5rem",
            color: "text",
          }}
        />
      ) : (
        <MoonIcon
          sx={{
            width: "1.5rem",
            height: "1.5rem",
            color: "text",
          }}
        />
      )}
    </button>
  )
}
