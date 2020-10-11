import React from "react"
import { Link } from "gatsby"

type Props = {
  to: string | null
  title?: string | null
  type: "next" | "previous"
}

const PageTurnLink: React.FC<Props> = ({ to, type, title, ...props }) => {
  return (
    <div
      {...props}
      sx={{
        fontWeight: "bold",
        textAlign: type === "next" ? "right" : "left",
      }}
    >
      {to ? (
        <Link to={to}>
          <div
            sx={{
              fontSize: title ? 1 : 2,
              opacity: title ? 0.7 : 1,
            }}
          >
            {type === "next" ? "NEXT" : "PREVIOUS"}
          </div>
          <div>{title}</div>
        </Link>
      ) : (
        <span />
      )}
    </div>
  )
}

export default PageTurnLink
