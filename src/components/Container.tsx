import React from "react"
import { css } from "@emotion/core"

type Props = {}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div
      css={{
        margin: "3rem auto",
        maxWidth: "850px",
      }}
    >
      {children}
    </div>
  )
}

export default Container
