import React from "react"
import { SiteMetadata } from "../types"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

type Props = {
  metadata: SiteMetadata
}

const Footer: React.FC<Props> = ({ metadata }) => {
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
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 5,
        py: 5,
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
          fontWeight: "bold",
          opacity: "0.7",
        }}
      >
        © 2020 {metadata.title}
      </div>
    </div>
  )
}

export default Footer
