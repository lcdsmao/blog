import React from "react"

import PageTurnLink from "./PageTurnLink"

type Props = {
  page: number
  total: number
  previous: string | null
  next: string | null
}

const Pagination: React.FC<Props> = ({ page, total, previous, next }) => {
  return (
    <nav
      sx={{
        display: "flex",
        alignItems: "baseline",
        marginTop: 5,
      }}
    >
      <PageTurnLink
        sx={{
          flex: "1 0 0",
        }}
        type="previous"
        to={previous}
      />

      <div
        sx={{
          fontSize: 1,
          fontWeight: "bold",
        }}
      >
        Page {page} of {total}
      </div>

      <PageTurnLink
        sx={{
          flex: "1 0 0",
        }}
        type="next"
        to={next}
      />
    </nav>
  )
}

export default Pagination
