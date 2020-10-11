import { PageProps, graphql } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import React from "react"
import { Container } from "theme-ui"

import App from "../components/App"
import { SiteMetadata } from "../types"

type Props = PageProps<{
  site: {
    siteMetadata: SiteMetadata
  }
  file: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}>

const NotFound: React.FC<Props> = ({ location, data }) => {
  return (
    <App location={location} metadata={data.site.siteMetadata}>
      <Container>
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
      </Container>
    </App>
  )
}

export default NotFound

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        siteUrl
        social {
          twitter
          github
        }
      }
    }
    file(relativePath: { eq: "the_scream.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 480) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
