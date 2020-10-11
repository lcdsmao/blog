import React from "react"
import { Container } from "theme-ui"
import { SiteMetadata } from "../types"
import { Link } from "gatsby"
import { Styled } from "theme-ui"

type Props = {
  isHome: boolean
  metadata: SiteMetadata
}

const Header: React.FC<Props> = ({ isHome, metadata }) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "baseline",
        gap: 3,
        a: {
          variant: "textStyles.heading",
        },
      }}
    >
      <Styled.a
        as={Link}
        to="/"
        sx={{
          fontSize: 4,
        }}
      >
        {metadata.title}
      </Styled.a>

      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "inherit",
        }}
      >
        <a href={`https://github.com/${metadata.social.github}`}>Github</a>
        <a href={`https://twitter.com/${metadata.social.twitter}`}>Twitter</a>
      </div>
    </Container>
  )
}

export default Header
