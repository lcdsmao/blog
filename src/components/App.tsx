import { MDXProvider } from "@mdx-js/react"
import { PageProps } from "gatsby"
import React from "react"
import { Container } from "theme-ui"
import { useSiteMetadata } from "../hooks/UseSiteMetadata"

import Footer from "./Footer"
import Header from "./Header"
import { mdxComponents } from "./MDXComponents"

type Props = {
  location: PageProps["location"]
}

const App: React.FC<Props> = ({ location, children }) => {
  const metadata = useSiteMetadata()
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
