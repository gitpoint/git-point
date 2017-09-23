import React, { Component } from 'react';
import { WebView, Platform } from 'react-native';

export class MarkdownWebView extends Component {
  props: {
    html: string,
    baseUrl: string,
  };

  decorateHtml = () => {
    let markdown = this.props.html;

    if (Platform.OS === 'android') {
      // Android's webview won't correctly render new lines in <pre> leading
      // to code being rendered on a single line.. we convert those to <br />s
      const preReg = /<pre>([\s\S]*?)<\/pre>/g;
      let match;
      let lastIndex = 0;

      markdown = '';

      /* eslint-disable no-cond-assign */
      while ((match = preReg.exec(this.props.html))) {
        markdown += this.props.html.substring(lastIndex, match.index);
        markdown += match[0].replace(/(?:\r\n|\r|\n)/g, '<br />');
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < this.props.html.length) {
        markdown += this.props.html.substring(lastIndex);
      }
    }

    const cssUri =
      Platform.OS === 'ios'
        ? 'https://machour.idk.tn/github-markdown.css'
        : 'file:///android_asset/css/github-markdown.css';

    return `<html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="${cssUri}" />
    </head>
    <body class="markdown-body">
      ${markdown}
      </body>
    </html>`;
  };

  render() {
    return (
      <WebView
        source={{
          html: this.decorateHtml(this.props.html),
          baseUrl: this.props.baseUrl,
        }}
      />
    );
  }
}
