const colors = {
  text: "#3d2c29",
  background: "#fafaf9",
  primary: "#e63b19",
  primaryVariant: "#cc4c33",
  secondary: "#e2bb9a",
  muted: "#f3eeed",
  highlight: "#e5dbd9",
  scrollbarThumb: "#cccccc",
  prismVariable: "#2e1f7a",
  prismComment: "#996f66",
  modes: {
    dark: {
      text: "#F2F5F7",
      background: "#121212",
      primary: "#FF7597",
      primaryVariant: "#FF5083",
      secondary: "#8F5B78",
      muted: "#1F1F1F",
      highlight: "#535353",
      scrollbarThumb: "#696969",
      prismVariable: "#BB86FC",
      prismComment: "#999",
    },
  },
}

const styles = {
  h1: {
    variant: "textStyles.display",
  },
  h2: {
    variant: "textStyles.heading",
    fontSize: 5,
  },
  h3: {
    variant: "textStyles.heading",
    fontSize: 4,
  },
  h4: {
    variant: "textStyles.heading",
    fontSize: 3,
  },
  h5: {
    variant: "textStyles.heading",
    fontSize: 2,
  },
  h6: {
    variant: "textStyles.heading",
    fontSize: 1,
  },
  a: {
    color: "text",
    textDecoration: "none",
    overflowWrap: "break-word",
    wordWrap: "break-word",
    "&:hover": {
      color: "primary",
    },
  },
  ul: {
    listStyle: "disc",
    mx: 3,
    px: 2,
  },
  strong: {
    fontWeight: 800,
  },
  blockquote: {
    bg: "muted",
    borderRadius: "2px",
    borderLeft: "4px solid",
    borderColor: "primary",
    m: 0,
    py: 1,
    paddingLeft: 3,
    paddingRight: 2,
    fontStyle: "italic",
  },
  pre: {
    variant: "prism",
    fontFamily: "monospace",
    fontSize: 1,
    py: 3,
    color: "text",
    bg: "muted",
    overflow: "auto",
    ".token-line": {
      px: 3,
      marginLeft: "2px",
    },
    ".token-line.highlight": {
      marginLeft: 0,
      borderLeft: "2px solid",
      borderColor: "primary",
      bg: "highlight",
    },
  },
  code: {
    fontFamily: "monospace",
    color: "primaryVariant",
    borderRadius: 2,
    bg: "muted",
    px: 1,
    py: 1,
    overflowWrap: "break-word",
    wordWrap: "break-word",
  },
  inlineCode: {
    fontFamily: "monospace",
    color: "primaryVariant",
    bg: "muted",
  },
  table: {
    width: "100%",
    my: 4,
    borderCollapse: "separate",
    borderSpacing: 0,
    "th,td": {
      textAlign: "left",
      py: "4px",
      pr: "4px",
      pl: 0,
      borderColor: "muted",
      borderBottomStyle: "solid",
    },
  },
  th: {
    verticalAlign: "bottom",
    borderBottomWidth: "2px",
  },
  td: {
    verticalAlign: "top",
    borderBottomWidth: "1px",
  },
  hr: {
    border: 0,
    borderBottom: "1px solid",
    borderColor: "muted",
  },
  img: {
    maxWidth: "100%",
  },
}

const theme = {
  useColorSchemeMediaQuery: true,
  colors: colors,
  breakpoints: ["40em", "52em", "64em"],
  space: [0, 4, 8, 16, 32, 48],
  fonts: {
    body: "Nunito, system-ui, -apple-system",
    heading: "inherit",
    monospace: "Roboto Mono, Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48],
  fontWeights: {
    body: 400,
    heading: 600,
    display: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  textStyles: {
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
    },
    display: {
      variant: "textStyles.heading",
      fontSize: [5, 6],
      fontWeight: "display",
      letterSpacing: "-0.03em",
      mt: 3,
    },
  },
  layout: {
    container: {
      px: 3,
      maxWidth: "80ch",
    },
  },
  buttons: {
    icon: {
      outline: "none",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      transition: "color .3s ease, background .3s ease",
      ...styles,
    },
  },
  prism: {
    ".comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url": {
      color: "prismComment",
    },
    ".comment": {
      fontStyle: "italic",
    },
    ".property,.tag,.boolean,.number,.constant,.symbol,.deleted,.function,.class-name,.regex,.important,.variable": {
      color: "prismVariable",
    },
    ".atrule,.attr-value,.keyword": {
      color: "primary",
    },
    ".selector,.attr-name,.string,.char,.builtin,.inserted": {
      color: "primaryVariant",
    },
  },
}

export default theme
