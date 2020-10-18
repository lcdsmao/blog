import { MDXProvider } from "@mdx-js/react"
import { PageProps } from "gatsby"
import React from "react"
import { Container } from "theme-ui"

import { SiteMetadata } from "../types"
import Footer from "./Footer"
import Header from "./Header"
import { mdxComponents } from "./MDXComponents"

type Props = {
  location: PageProps["location"]
  metadata: SiteMetadata
}

const App: React.FC<Props> = ({ location, metadata, children }) => {
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
        <Header isHome={location.pathname === "/"} metadata={metadata} />
        <main
          sx={{
            marginTop: 4,
          }}
        >
          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        </main>
      </Container>
      <Footer metadata={metadata} />
    </div>
  )
}

export default App
