import React from "react"
/** @jsx jsx */
import { jsx } from "theme-ui"

type Props = {}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div
      sx={{
        maxWidth: "1000px",
        mx: "auto",
        my: 1,
        px: 1,
        py: 0,
      }}
    >
      {children}
    </div>
  )
}

export default Container
