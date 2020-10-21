import React from "react"
import {
  TypeScale,
  TypeStyle,
  HeadingStyle,
  ColorPalette,
  FontFamily,
} from "@theme-ui/style-guide"
import { PageProps } from "gatsby"
import Seo from "../components/Seo"

const ThemePage: React.FC<PageProps> = ({ location }) => {
  return (
    <>
      <Seo location={location} title="Theme" />
      <h2>Colors</h2>
      <ColorPalette omit={["modes"]} />
      <h2>Typography</h2>
      <TypeStyle fontSize={7}>
        Body: <FontFamily name="body" />
      </TypeStyle>
      <HeadingStyle
        fontFamily="heading"
        fontWeight="heading"
        lineHeight="heading"
        fontSize={7}
      >
        Heading: <FontFamily name="heading" />
      </HeadingStyle>
      <h2>Type Scale</h2>
      <TypeScale />
    </>
  )
}

export default ThemePage
