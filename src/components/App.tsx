import { PageProps } from "gatsby"
import React from "react"
import { SiteMetadata } from "../types"
import Header from "./Header"
import Footer from "./Footer"

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
      <Header isHome={location.pathname === "/"} metadata={metadata} />
      <main
        sx={{
          flex: "1 0 auto",
        }}
      >
        {children}
      </main>
      <Footer metadata={metadata} />
    </div>
  )
}

export default App
