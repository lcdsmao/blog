import { MDXProvider } from "@mdx-js/react"
import React from "react"
import { Container } from "theme-ui"

import Footer from "./Footer"
import Header from "./Header"
import { mdxComponents } from "./MDXComponents"

const App: React.FC = ({ children }) => {
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Container
        sx={{
          flex: "1 0 auto",
        }}
      >
        <Header />
        <main
          sx={{
            marginTop: 4,
          }}
        >
          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        </main>
      </Container>
      <Footer />
    </div>
  )
}

export default App
