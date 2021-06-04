import React from 'react'

interface HTMLPropsType {
  htmlAttributes: Record<string, unknown>;
  headComponents: unknown[];
  bodyAttributes: Record<string, unknown>;
  preBodyComponents: unknown[];
  body: string;
  postBodyComponents: unknown[];
}

export default class HTML extends React.Component<HTMLPropsType> {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <noscript>This site runs best with JavaScript enabled.</noscript>
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}