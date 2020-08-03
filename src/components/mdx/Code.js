import React from 'react'
import theme from '../../lib/theme'
import rangeParser from 'parse-numeric-range'
import Highlight, { defaultProps } from 'prism-react-renderer'
import Prism from 'prism-react-renderer/prism'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

// Following advice from this issue https://github.com/FormidableLabs/prism-react-renderer/issues/53
;(typeof global !== 'undefined' ? global : window).Prism = Prism

// Add syntax highlighting support for Rust
require('prismjs/components/prism-rust')
// Add syntax highlighting support for Reason
require('prismjs/components/prism-reason')
// Add syntax highlighting support for Clojure
require('prismjs/components/prism-clojure')

// Used to determine if we have to highlight the given index
// Borrowed from https://prince.dev/blog/highlight-with-react
const calculateLinesToHighlight = meta => {
  const RE = /{([\d,-]+)}/
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)[1]
    const lineNumbers = rangeParser(strlineNumbers)
    return index => lineNumbers.includes(index + 1)
  } else {
    return () => false
  }
}

// todo test metastring
const Code = ({
  children,
  metastring,
  className = 'language-js',
  ...props
}) => {
  const language = className.replace(/language-/, '')
  const shouldHighlightLine = calculateLinesToHighlight(metastring)
  if (props['react-live']) {
    return (
      <LiveProvider code={children.trim()} theme={theme}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    )
  } else {
    return (
      <Highlight
        {...defaultProps}
        code={children.trim()}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{ ...style, padding: '20px', margin: '0' }}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i })
              if (shouldHighlightLine(i)) {
                lineProps.className = `${lineProps.className} highlight-line`
              }
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    )
  }
}

export default Code
