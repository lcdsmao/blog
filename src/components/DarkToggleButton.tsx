import { keyframes } from "@emotion/core"
import { useRef } from "react"
import { IconButton, useColorMode } from "theme-ui"

import { MoonIcon, SunIcon } from "./icons"

const appear = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  100% {
    transform: scale(1.0);
    opacity: 0.7;
  }
`

const DarkToggleButton: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode()
  const buttonRef = useRef(null)
  const iconSx = {
    width: "1.5rem",
    height: "1.5rem",
    color: "text",
    animation: buttonRef.current ? `${appear} 0.3s ease-in` : "none",
    opacity: 0.7,
    transition: "opacity 0.3s ease-in",
    "&:hover": {
      opacity: 1,
    },
  }

  return (
    <IconButton
      ref={buttonRef}
      aria-label={`Toggle ${colorMode === "default" ? "Dark" : "Light"}`}
      onClick={(_) => {
        setColorMode(colorMode === "default" ? "dark" : "default")
      }}
    >
      {colorMode === "default" ? (
        <SunIcon sx={iconSx} />
      ) : (
        <MoonIcon sx={iconSx} />
      )}
    </IconButton>
  )
}

export default DarkToggleButton
