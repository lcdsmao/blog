import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"

type Props = {
  page: number
  total: number
  previous: string | null
  next: string | null
}

const Pagination: React.FC<Props> = ({ page, total, previous, next }) => {
  return (
    <nav
      css={css({
        display: "flex",
      })}
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
      css={css({
        flex: 1,
        textAlign: isPrevious ? "start" : "end",
      })}
    >
      {link ? (
        <Link to={link}>{isPrevious ? "Previous" : "Next"}</Link>
      ) : (
        <a aria-disabled={true}></a>
      )}
    </div>
  )
}
