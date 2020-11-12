import React from "react"

import PageTurnLink from "./PageTurnLink"

type Props = {
  page: number
  total: number
  previous: string | null
  next: string | null
}

const Pagination: React.FC<Props> = ({ page, total, previous, next }) => {
  if (!previous || !next) return null
  return (
    <nav
      sx={{
        display: "flex",
        alignItems: "baseline",
        marginTop: [4, 5],
      }}
    >
      {previous && (
        <PageTurnLink
          sx={{
            flex: "1 0 0",
          }}
          type="previous"
          to={previous}
        />
      )}

      <div
        sx={{
          fontSize: 1,
          fontWeight: "bold",
        }}
      >
        Page {page} of {total}
      </div>

      {next && (
        <PageTurnLink
          sx={{
            flex: "1 0 0",
          }}
          type="next"
          to={next}
        />
      )}
    </nav>
  )
}

export default Pagination
