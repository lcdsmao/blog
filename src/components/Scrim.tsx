import React from "react"

const Scrim: React.FC<React.ComponentPropsWithoutRef<"svg">> = ({
  ...props
}) => {
  return (
    <svg width="100%" height="100%" {...props}>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0" stopColor="white" stopOpacity="1" />
          <stop offset="8.1%" stopColor="white" stopOpacity="0.987" />
          <stop offset="15.5%" stopColor="white" stopOpacity="0.951" />
          <stop offset="22.5%" stopColor="white" stopOpacity="0.896" />
          <stop offset="29%" stopColor="white" stopOpacity="0.825" />
          <stop offset="35.3%" stopColor="white" stopOpacity="0.741" />
          <stop offset="41.2%" stopColor="white" stopOpacity="0.648" />
          <stop offset="47.1%" stopColor="white" stopOpacity="0.55" />
          <stop offset="52.9%" stopColor="white" stopOpacity="0.45" />
          <stop offset="58.8%" stopColor="white" stopOpacity="0.3542" />
          <stop offset="64.7%" stopColor="white" stopOpacity="0.259" />
          <stop offset="71%" stopColor="white" stopOpacity="0.175" />
          <stop offset="77.5%" stopColor="white" stopOpacity="0.104" />
          <stop offset="84.5%" stopColor="white" stopOpacity="0.049" />
          <stop offset="91.9%" stopColor="white" stopOpacity="0.013" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="gradient-mask">
          <rect width="100%" height="100%" fill="url(#gradient)" />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        mask="url(#gradient-mask)"
        sx={{
          fill: "background",
          transition: "fill .3s ease",
        }}
      />
    </svg>
  )
}

export default Scrim
