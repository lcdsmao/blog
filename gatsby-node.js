const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { paginate } = require("gatsby-awesome-pagination")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "Mdx") {
    const relativePath = createFilePath({
      node,
      getNode,
    })
    createNodeField({
      node,
      name: "slug",
      value: `/${relativePath.split("_")[1]}`, // remove folder, date prefix
    })
  }
}

const ItemsPerPage = 10

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostComponent = path.resolve("./src/templates/blog-post.tsx")
  const indexComponent = path.resolve("./src/templates/index.tsx")
  const tagComponent = path.resolve("./src/templates/tag.tsx")

  const result = await graphql(`
    query {
      allMdx(sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
        group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
    }
  `)

  const posts = result.data.allMdx.edges

  posts.forEach((post, index) => {
    const previous = index === 0 ? null : posts[index - 1].node
    const next = index === posts.length - 1 ? null : posts[index + 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPostComponent,
      context: {
        slug: post.node.fields.slug,
        previous: previous,
        next: next,
      },
    })
  })

  paginate({
    createPage,
    items: posts,
    itemsPerPage: ItemsPerPage,
    pathPrefix: ({ pageNumber }) => {
      if (pageNumber === 0) {
        return "/"
      } else {
        return `/page/${pageNumber}/`
      }
    },
    component: indexComponent,
  })

  const tags = result.data.allMdx.group
  tags.forEach(({ tag }) => {
    createPage({
      path: `/tags/${tag}/`,
      component: tagComponent,
      context: {
        tag: `${tag}`,
      },
    })
  })
}
