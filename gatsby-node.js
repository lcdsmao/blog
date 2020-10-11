const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { paginate } = require("gatsby-awesome-pagination")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "Mdx") {
    const relativePath = createFilePath({
      node,
      getNode,
      basePath: "content/blog/",
    })
    createNodeField({
      node,
      name: "slug",
      value: relativePath.split("_")[1], // remove date prefix
    })
  }
}

const ItemsPerPage = 10

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostComponent = path.resolve("./src/templates/blog-post.tsx")
  const indexComponent = path.resolve("./src/templates/index.tsx")

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
      }
    }
  `)

  const posts = result.data.allMdx.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

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
        return "/page"
      }
    },
    component: indexComponent,
  })
}
