import React from "react"
import Prism from "prismjs"
import Highlight, { Language } from "prism-react-renderer"
import { Badge } from "theme-ui"
import "prismjs/components/prism-kotlin"

import CopyButton from "./CopyButton"

const aliases: Record<string, Language | undefined> = {
  js: "javascript",
  sh: "bash",
}

const isInRange = (start: number, end: number, num: number) => {
  if (num >= start && num <= end) {
    return true
  }
  return false
}

const checkRanges = (range: number[], num: number) => {
  for (let i = 0; i < range.length; i += 2) {
    if (isInRange(range[i], range[i + 1], num)) {
      return true
    }
  }
  return false
}

type HighlightProps = React.ComponentProps<typeof Highlight>
// prism-react-renderer doesn't export `Token` type
type Tokens = Parameters<HighlightProps["children"]>[0]["tokens"]
type Token = Tokens[number][number]

type Props = HighlightProps & {
  className: string
}

const CodeBlock: React.FC<Props> = ({
  children,
  className: outerClassName = "language-text",
}) => {
  const [language] = outerClassName.replace("language-", "").split(" ")
  const lang = aliases[language] || language
  let startEndRangesToHighlight: number[] = []

  const findStartAndEndHighlights = (tokens: Token[][]) => {
    const tokensWithoutHighlightComments = tokens.filter((item, index) => {
      const removeLine = item
        .map(({ content }) => {
          if (content === "// highlight-start") {
            startEndRangesToHighlight.push(index) // track our highlighted lines
            return true
          }
          if (content === "// highlight-end") {
            startEndRangesToHighlight.push(index - 2) // since we're removing start and end lines, we'll shorten the range by 2 lines
            return true
          }
        })
        .filter(Boolean)[0]

      if (!removeLine) {
        return item
      }
    })
    return tokensWithoutHighlightComments
  }

  const isStartEndHighlighted = (index: number) => {
    return checkRanges(startEndRangesToHighlight, index)
  }

  const isInlineHighlighted = (line: Token[]) => {
    const regex = new RegExp("// highlight-line$")
    for (let token of line) {
      if (regex.test(token.content)) {
        token.content = token.content.replace(regex, "") // remove the highlight-line comment now that we've acted on it
        return true
      }
    }
    return false
  }

  const shouldHighlightLine = (line: Token[], index: number) => {
    return isStartEndHighlighted(index) || isInlineHighlighted(line)
  }

  // @ts-ignore
  const code = children.trim()

  return (
    // @ts-ignore
    <Highlight Prism={Prism} code={code} language={lang as Language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        const tokensWithoutHighlightComments = findStartAndEndHighlights(tokens)
        return (
          <div
            sx={{
              position: "relative",
              bg: "muted",
            }}
          >
            <Badge
              sx={{
                bg: "highlight",
                color: "text",
                verticalAlign: "top",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                marginLeft: 3,
                px: 2,
                textTransform: "uppercase",
              }}
            >
              {lang}
            </Badge>
            <CopyButton
              content={code}
              duration={1000}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                m: 1,
              }}
            />
            <pre
              className={`${outerClassName} ${className}`}
              style={style}
              sx={{
                paddingTop: 1,
              }}
            >
              {tokensWithoutHighlightComments.map((line, i) => {
                const lineProps = getLineProps({ line, key: i })
                if (shouldHighlightLine(line, i)) {
                  lineProps.className = `${lineProps.className} highlight`
                }
                return (
                  <div {...lineProps}>
                    {line.map((token, key) => (
                      <span
                        {...getTokenProps({ token, key })}
                        sx={
                          token.empty ? { display: "inline-block" } : undefined
                        }
                      />
                    ))}
                  </div>
                )
              })}
            </pre>
          </div>
        )
      }}
    </Highlight>
  )
}

export default CodeBlock
