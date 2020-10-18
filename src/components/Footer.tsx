import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import { useSiteMetadata } from "../hooks/UseSiteMetadata"

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
  return (
    <div
      sx={{
        display: "flex",
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
