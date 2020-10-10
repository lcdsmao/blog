import React from "react"
import { Link } from "gatsby"
/** @jsx jsx */
import { jsx } from "theme-ui"

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
      }}
    >
      <PreviousOrNextButton isPrevious={true} link={previous} />
      <span>
        Page {page} of {total}
      </span>
      <PreviousOrNextButton isPrevious={false} link={next} />
    </nav>
  )
}

export default Pagination

const PreviousOrNextButton: React.FC<{
  isPrevious: boolean
  link: string | null
}> = ({ isPrevious, link }) => {
  return (
    <div
      sx={{
        flex: 1,
        textAlign: isPrevious ? "start" : "end",
      }}
    >
      {link ? (
        <Link to={link}>{isPrevious ? "Previous" : "Next"}</Link>
      ) : (
        <a aria-disabled={true}></a>
      )}
    </div>
  )
}
