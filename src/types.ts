export type SiteMetadata = {
  title: string
  description: string
  siteUrl: string
  social: {
    twitter: string
    github: string
  }
}

export type Frontmatter = {
  title: string
  date: string
  tags: string[]
}

export type Mdx = {
  id: string
  excerpt: string
  body: string
  frontmatter: Frontmatter
  fields: {
    slug: string
  }
}
