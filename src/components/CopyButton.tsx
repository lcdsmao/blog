import React from "react"
import { IconButton } from "theme-ui"

import { CopyIcon } from "./icons"
import copyToClipboard from "../utils/copy-to-clipboard"

type Props = {
  content: string
  duration: number
}

const CopyButton: React.FC<Props> = ({ content, duration, ...rest }) => {
  const [copied, setCopied] = React.useState(false)
  return (
    <div {...rest}>
      <IconButton
        aria-label="Copy to clipboard"
        disabled={copied}
        onClick={async () => {
          await copyToClipboard(content)
          setCopied(true)
          await new Promise((resolve) => setTimeout(resolve, duration))
          setCopied(false)
        }}
        sx={{
          "& svg": {
            transition: "opacity .3s ease",
          },
          "&:enabled svg": {
            opacity: 0.7,
          },
          "&:enabled:hover svg": {
            opacity: 1,
          },
          "&:disabled svg": {
            cursor: "not-allowed",
            opacity: 0.3,
          },
        }}
      >
        <CopyIcon size={20} />
        <span
          sx={{
            position: "absolute",
            bottom: "100%",
            py: 1,
            px: 2,
            bg: "muted",
            zIndex: 1,
            borderRadius: "4px",
            visibility: copied ? "visible" : "hidden",
            opacity: copied ? 1 : 0,
            transform: `
              translateY(${copied ? "-50%" : "0"})
              scale(${copied ? 1 : 0.8})
            `,
            transformOrigin: "50% 100%",
            transition: "all .3s ease",
            "&::after": {
              content: '""',
              position: "absolute",
              top: "100%",
              left: "50%",
              marginLeft: "-5px",
              borderWidth: "5px 5px 0",
              borderStyle: "solid",
              borderColor: (theme) =>
                `${theme.colors.muted} transparent transparent transparent`,
            },
          }}
        >
          Copied!
        </span>
      </IconButton>
    </div>
  )
}

export default CopyButton
