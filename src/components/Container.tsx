import React from "react"

type Props = {}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div
      css={{
        margin: "3rem auto",
        maxWidth: "850px",
        padding: "0 3rem",
      }}
    >
      {children}
    </div>
  )
}

export default Container
