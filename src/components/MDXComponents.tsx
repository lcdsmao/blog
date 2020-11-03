import { MDXProviderComponents } from "@mdx-js/react"
import React from "react"
import CodeBlock from "./CodeBlock"

export const mdxComponents: MDXProviderComponents = {
  a: (props) => (
    <a
      {...props}
      sx={{
        color: "primaryVariant",
        textDecoration: "underline",
      }}
    />
  ),
  pre: (props) => props.children,
  code: CodeBlock,
}
