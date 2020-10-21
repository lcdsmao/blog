import { useStaticQuery, graphql } from "gatsby"
import { SiteMetadata } from "../types"

export const useSiteMetadata: () => SiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            titleTemplate
            description
            siteUrl
            social {
              twitter
              github
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}
