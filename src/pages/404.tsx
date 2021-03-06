import { PageProps, graphql } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import React from "react"
import Head from "../components/Head"

type Props = PageProps<{
  file: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}>

const NotFound: React.FC<Props> = ({ location, data }) => {
  return (
    <>
      <Head location={location} title="404 Not Found" />
      <h1 sx={{ textAlign: "center" }}>404 Not Found!</h1>
      <div
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Img
          fluid={data.file.childImageSharp.fluid}
          title="The Scream"
          sx={{
            flex: "1 1 auto",
            maxWidth: [240, 360, 480],
          }}
        />
      </div>
    </>
  )
}

export default NotFound

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "the_scream.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 480) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
