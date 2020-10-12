import { keyframes } from "@emotion/core"
import { useColorMode } from "theme-ui"

import { MoonIcon, SunIcon } from "./icons"

const appear = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  100% {
    transform: scale(1.0);
    opacity: 1.0;
  }
`

const DarkToggleButton: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode()
  if (!colorMode) {
    return null
  }
  const iconSx = {
    width: "1.5rem",
    height: "1.5rem",
    color: "text",
    animation: `${appear} 0.3s ease-in`,
  }
  return (
    <button
      sx={{
        background: "inherit",
        border: "none",
        p: 1,
        outline: "inherit",
        opacity: 0.7,
        "&:hover": {
          opacity: 1,
        },
      }}
      title={`Toggle ${colorMode === "default" ? "Dark" : "Light"}`}
      onClick={_ => {
        setColorMode(colorMode === "default" ? "dark" : "default")
      }}
    >
      {colorMode === "default" ? (
        <SunIcon sx={iconSx} />
      ) : (
        <MoonIcon sx={iconSx} />
      )}
    </button>
  )
}

export default DarkToggleButton
