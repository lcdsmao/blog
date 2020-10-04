const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { paginate } = require("gatsby-awesome-pagination")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

const ItemsPerPage = 2

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostComponent = path.resolve("./src/templates/blog-post.tsx")
  const indexComponent = path.resolve("./src/templates/index.tsx")

  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
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

  const posts = result.data.allMarkdownRemark.edges

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
