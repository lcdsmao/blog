import { PageProps } from "gatsby"
import React from "react"
import { SiteMetadata } from "../types"
import Header from "./Header"

type Props = {
  location: PageProps["location"]
  metadata: SiteMetadata
}

const App: React.FC<Props> = ({ location, metadata, children }) => {
  return (
    <>
      <div>
        <div>
          <Header isHome={location.pathname === "/"} metadata={metadata} />
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}

export default App
