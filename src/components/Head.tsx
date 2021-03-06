import { PageProps } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import { useThemeUI } from "theme-ui"
import { useSiteMetadata } from "../hooks/UseSiteMetadata"

type Props = {
  location: PageProps["location"]
  title?: string
  description?: string
  article?: boolean
}

const Head: React.FC<Props> = ({ location, title, description, article }) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    titleTemplate,
    siteUrl,
    social,
  } = useSiteMetadata()
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    titleTemplate: title ? titleTemplate : undefined,
    image: `${siteUrl}/lcdsmaodev.jpg`,
    url: `${siteUrl}${location.pathname}`,
  }
  const { theme } = useThemeUI()
  return (
    <Helmet title={seo.title} titleTemplate={seo.titleTemplate} defer={false}>
      <html lang="en" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {social.twitter && (
        <meta name="twitter:creator" content={social.twitter} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
      <meta name="theme-color" content={theme.colors.primary} />
      <meta name="background-color" content={theme.colors.background} />
    </Helmet>
  )
}

export default Head
