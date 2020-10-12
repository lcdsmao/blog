import { useColorMode } from "theme-ui"

import { MoonIcon, SunIcon } from "./icons"

const DarkToggleButton: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode()
  console.log(colorMode)
  if (!colorMode) {
    return null
  }
  return (
    <button
      sx={{
        background: "inherit",
        border: "none",
        p: 1,
        outline: "inherit",
        transition: "opacity .3s ease",
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
        <SunIcon
          sx={{
            width: "1.5rem",
            height: "1.5rem",
            color: "text",
          }}
        />
      ) : (
        <MoonIcon
          sx={{
            width: "1.5rem",
            height: "1.5rem",
            color: "text",
          }}
        />
      )}
    </button>
  )
}

export default DarkToggleButton
