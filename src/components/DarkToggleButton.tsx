import React from "react"
import { useSpring, useSprings, animated, config } from "react-spring"
import { IconButton, useColorMode } from "theme-ui"

const sunProp = {
  svg: {
    transform: "rotate(180deg)",
  },
  mask: {
    cx: "100%",
    cy: "0",
    r: "3",
  },
  centerCircle: {
    r: 5,
  },
  surroundCircle: {
    transform: "scale(1)",
    opacity: 1,
    from: {
      // Bug?
      // If no from value then only the first is valid in the first renderering.
      transform: "scale(1)",
      opacity: 1,
    },
  },
}

const moonProp = {
  svg: {
    transform: "rotate(45deg)",
  },
  mask: {
    cx: "50%",
    cy: "3",
    r: "9",
  },
  centerCircle: {
    r: 9,
  },
  surroundCircle: {
    transform: "scale(0)",
    opacity: 0,
  },
}

const springConfig = {
  mass: 2,
  tension: 250,
  friction: 25,
}

const DarkToggleButton: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode()
  const { svg, mask, centerCircle, surroundCircle } =
    colorMode === "default" ? sunProp : moonProp
  const surroundCircleProps = useSprings(
    8,
    [...Array(8).keys()].map((i) => {
      return {
        ...surroundCircle,
        transformOrigin: "center",
        delay: colorMode === "default" ? i * 50 : 0,
        config: config.stiff,
      }
    })
  )
  const svgProps = useSpring({
    ...svg,
    config: springConfig,
  })
  const maskProps = useSpring({
    ...mask,
    config: springConfig,
  })
  const centerCircleProps = useSpring({
    ...centerCircle,
    config: springConfig,
  })
  return (
    <IconButton
      aria-label={`Toggle ${colorMode === "default" ? "Dark" : "Light"}`}
      onClick={(_) => {
        setColorMode(colorMode === "default" ? "dark" : "default")
      }}
    >
      <animated.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1.5rem"
        height="1.5rem"
        color="text"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={svgProps}
      >
        <mask id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <animated.circle
            fill="black"
            // @ts-ignore
            style={maskProps}
          />
        </mask>
        <animated.circle
          cx="12"
          cy="12"
          r="9"
          fill="currentColor"
          mask="url(#moon-mask)"
          // @ts-ignore
          style={centerCircleProps}
        />
        {surroundCircleProps.map((props, i) => {
          const radians = Math.PI / 2 - (i * Math.PI) / 4
          const cx = 12 + 9 * Math.cos(radians)
          const cy = 12 - 9 * Math.sin(radians)
          return (
            <animated.circle
              key={i.toString()}
              cx={cx}
              cy={cy}
              r="1.5"
              fill="currentColor"
              // @ts-ignore
              style={props}
            />
          )
        })}
      </animated.svg>
    </IconButton>
  )
}

export default DarkToggleButton
