import { PageProps } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

import { SiteMetadata } from "../types"

type Props = {
  location: PageProps["location"]
  metadata: SiteMetadata
  title?: string
  description?: string
  article?: boolean
}

const Seo: React.FC<Props> = ({
  location,
  metadata,
  title,
  description,
  article,
}) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    titleTemplate,
    siteUrl,
    social,
  } = metadata
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: null, // TODO
    url: `${siteUrl}${location.pathname}`,
  }
  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
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
    </Helmet>
  )
}

export default Seo
