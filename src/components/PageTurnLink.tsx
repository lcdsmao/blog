import { Link } from "gatsby"
import React from "react"

type Props = {
  to: string
  title?: string
  type: "next" | "previous"
}

const PageTurnLink: React.FC<Props> = ({ to, type, title, ...props }) => {
  return (
    <div
      sx={{
        fontWeight: "bold",
        textAlign: type === "next" ? "right" : "left",
      }}
      {...props}
    >
      <Link to={to}>
        <p
          sx={{
            fontSize: title ? 1 : 2,
            opacity: title ? 0.7 : 1,
            m: 0,
          }}
        >
          {type === "next" ? "NEXT" : "PREVIOUS"}
        </p>
        {title ? <p sx={{ m: 0 }}>{title}</p> : null}
      </Link>
    </div>
  )
}

export default PageTurnLink
