import React from "react"
import { SiteMetadata } from "../types"

type Props = {
  metadata: SiteMetadata
}

const Header: React.FC<Props> = ({ metadata }) => {
  return (
    <div>
      <h1>{metadata.title}</h1>
    </div>
  )
}

export default Header
