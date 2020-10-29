import { graphql, navigate, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import React, { useMemo, useState } from "react"
import { useSiteMetadata } from "../hooks/UseSiteMetadata"
import { GitHubIcon, TwitterIcon } from "./icons"

const Footer: React.FC = () => {
  const metadata = useSiteMetadata()
  const data = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "icon.png" }) {
          childImageSharp {
            fixed(width: 80) {
              ...GatsbyImageSharpFixed_noBase64
            }
          }
        }
      }
    `
  )
  const [themeCount, setThemeCount] = useState(0)
  const canNaigateToTheme = useMemo(() => themeCount >= 10, [themeCount])
  return (
    <div
      sx={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        marginTop: [3, 4],
        py: 4,
        bg: "muted",
      }}
    >
      <Img
        fixed={data.file.childImageSharp.fixed}
        title="The Scream"
        sx={{
          width: 80,
          marginBottom: 3,
        }}
      />
      <div
        sx={{
          marginBottom: 2,
          "& > a": {
            mx: 2,
          },
        }}
      >
        <a href={`https://twitter.com/${metadata.social.twitter}`}>
          <TwitterIcon size={20} />
        </a>
        <a href={`https://github.com/${metadata.social.github}`}>
          <GitHubIcon size={20} />
        </a>
      </div>
      <div
        sx={{
          fontWeight: "bold",
          opacity: "0.7",
        }}
      >
        © 2020 {metadata.title}
      </div>
      <div
        sx={{
          position: "absolute",
          width: "48px",
          top: 0,
          bottom: 0,
          right: 0,
        }}
        onClick={() => {
          if (canNaigateToTheme) {
            setThemeCount(0)
            navigate("/theme")
          } else {
            setThemeCount(themeCount + 1)
          }
        }}
      />
    </div>
  )
}

export default Footer
