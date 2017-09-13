import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, Platform } from 'react-native';
import HTMLView from 'react-native-htmlview';
import marked from 'marked';

import { ImageZoom } from 'components';
import { colors, emojis, fonts, normalize } from 'config';

const lightFont = {
  ...fonts.fontPrimaryLight,
};

const regularFont = {
  ...fonts.fontPrimary,
};

const textStyleLight = {
  fontSize: Platform.OS === 'ios' ? normalize(11) : normalize(12),
  color: colors.primaryDark,
  ...lightFont,
};

const textStyleRegular = {
  fontSize: Platform.OS === 'ios' ? normalize(11) : normalize(12),
  color: colors.primaryDark,
  ...regularFont,
};

const textStyle = Platform.OS === 'ios' ? textStyleLight : textStyleRegular;

const linkStyle = {
  color: colors.primaryDark,
  ...fonts.fontPrimarySemiBold,
};

const styles = StyleSheet.create({
  span: textStyle,
  p: {
    padding: 0,
    margin: 0,
    ...textStyle,
  },
  strong: {
    ...textStyle,
    ...fonts.fontPrimaryBold,
  },
  em: {
    ...textStyle,
    ...fonts.fontPrimaryBold, // FIXME: we need an italic font
    fontStyle: 'normal',
  },
  // em: textStyle,
  h1: textStyle,
  h2: textStyle,
  h3: textStyle,
  h4: textStyle,
  li: textStyle,
  a: linkStyle,
});

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  // TODO: code highlighting
  /* highlight: code => {
    return require('highlight.js').highlightAuto(code).value;
  }, */
});

const { height, width } = Dimensions.get('window');

export class MarkdownHtmlview extends Component {
  props: {
    source: string,
  };

  transformMarkdown = md => {
    const rendered = marked(md);

    // console.log(rendered);

    return rendered;
  };

  render() {
    // console.log(this.props.source);
    const rendererStyles = {
      newLine: {
        // backgroundColor: '#00FF00',
        height: 5,
        width: 5,
      },
      p: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 0,
        padding: 0,
      },
      li: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexGrow: 1,
        margin: 0,
        padding: 0,
        backgroundColor: '#ffcc00',
      },
      h1: {
        text: {
          fontSize: normalize(24),
        },
        wrapper: {
          borderBottomWidth: 1,
          marginBottom: 12,
        },
      },
      h2: {
        text: {
          fontSize: normalize(20),
        },
        wrapper: {
          borderBottomWidth: 1,
          marginBottom: 12,
        },
      },
      h3: {
        text: {
          fontSize: normalize(18),
        },
      },
      h4: {
        text: {
          fontSize: normalize(16),
        },
      },
      h5: {
        text: {
          fontSize: normalize(14),
        },
      },
      h6: {
        text: {
          fontSize: normalize(12),
        },
      },
    };
    const myDomElement = (node, index, siblings, parent, defaultRenderer) => {
      // const onLinkPress = this.props.onLinkPress;

      /* eslint-disable default-case */
      switch (node.type) {
        case 'text':
          if (node.data === '\n') {
            return <Text style={rendererStyles.newLine} />;
          }

          /* eslint-disable no-param-reassign */
          // Convert checkboxes
          node.data = node.data.replace(
            /^\s*\[\s?\]/,
            emojis.white_large_square
          );
          node.data = node.data.replace(/^\s*\[x\]/i, emojis.white_check_mark);
          // Convert emojis
          node.data = node.data.replace(/:(\w+):/g, text => {
            const emoji = text.replace(/:/g, '');

            return emojis[emoji] ? emojis[emoji] : text;
          });

          break;

        case 'tag':
          switch (node.name) {
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
              return (
                <View
                  key={index}
                  style={{
                    borderBottomColor: colors.greyMid,
                    ...rendererStyles[node.name].wrapper,
                  }}
                >
                  <Text
                    style={{
                      color: colors.primaryDark,
                      ...fonts.fontPrimarySemiBold,
                      ...rendererStyles[node.name].text,
                      paddingBottom: 4,
                    }}
                  >
                    {defaultRenderer(node.children, parent)}
                  </Text>
                </View>
              );

            case 'img':
              return (
                <ImageZoom
                  key={index}
                  style={{ width: width * 0.5, height: height * 0.3 }}
                  uri={{ uri: node.attribs.src }}
                />
              );

            case 'p':
              return (
                <View key={index} style={rendererStyles.p}>
                  {defaultRenderer(node.children, parent)}
                </View>
              );

            /* case 'li':
              return (
                  <Text style={{ ...rendererStyles.li, flexDirection: 'column' }}>
                    <Text style={rendererStyles.newLine} />
                    • {defaultRenderer(node.children, parent)}
                  </Text>
              ); */

            case 'blockquote':
              return (
                <View
                  key={index}
                  style={{
                    paddingHorizontal: 12,
                    borderLeftWidth: 3,
                    borderLeftColor: colors.greyMid,
                  }}
                >
                  <View
                    style={{
                      color: colors.greyBlue,
                      ...fonts.fontPrimaryLight,
                    }}
                  >
                    {defaultRenderer(node.children, parent)}
                  </View>
                </View>
              );

            case 'hr':
              return (
                <View
                  key={index}
                  style={{ height: 4, backgroundColor: colors.greyLight }}
                />
              );

            case 'pre':
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: colors.greyMidLight,
                    marginBottom: 10,
                  }}
                >
                  {defaultRenderer(node.children, parent)}
                </View>
              );

            case 'code':
              return (
                <Text
                  key={index}
                  style={{
                    ...fonts.fontCode,
                    backgroundColor: colors.greyMidLight,
                    fontSize: normalize(10),
                  }}
                >
                  {defaultRenderer(node.children, parent)}
                </Text>
              );

            /* case 'a':
              return (
                <Text
                  key={index}
                  style={{
                    ...fonts.fontPrimarySemiBold,
                    color: colors.primaryDark,
                  }}
                  // onPress={() => onLinkPress(node)}
                >
                  {defaultRenderer(node.children, parent)}
                </Text>
              ); */
          }
          break;
      }

      return undefined;
    };

    return (
      <HTMLView
        value={this.transformMarkdown(this.props.source)}
        stylesheet={styles}
        renderNode={myDomElement}
        paragraphBreak="foo"
        addLineBreaks={false}
      />
    );
  }
}
