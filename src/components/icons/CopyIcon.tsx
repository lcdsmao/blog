import React from "react"

import { Props } from "./props"

export const CopyIcon: React.FC<Props> = ({ size, ...rest }) => {
  return (
    <svg height={size} width={size} viewBox="0 0 24 24" {...rest}>
      <title>Copy</title>
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
        fill="currentColor"
      />
    </svg>
  )
}
