import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, Platform } from 'react-native';
import HTMLView from 'react-native-htmlview';
import marked from 'marked';
import { TableWrapper, Table, Cell } from 'react-native-table-component';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { github as GithubStyle } from 'react-syntax-highlighter/dist/styles';

import { ImageZoom } from 'components';
import { colors, emojis, fonts, normalize } from 'config';

const lightFont = {
  ...fonts.fontPrimaryLight,
};

const regularFont = {
  ...fonts.fontPrimary,
};

const textStyleLight = {
  ...lightFont,
  fontSize: Platform.OS === 'ios' ? normalize(11) : normalize(12),
  color: colors.primaryDark,
};

const textStyleRegular = {
  ...regularFont,
  fontSize: Platform.OS === 'ios' ? normalize(11) : normalize(12),
  color: colors.primaryDark,
};

const textStyle = Platform.OS === 'ios' ? textStyleLight : textStyleRegular;

const boldStyle = {
  ...textStyle,
  ...fonts.fontPrimarySemiBold,
};
const italicStyle = { ...textStyle, ...fonts.fontPrimaryItalic };
const hrStyle = { borderBottomWidth: 2, borderBottomColor: colors.greyDark };
const underlineStyle = { textDecorationLine: 'underline' };
const codeStyle = {
  ...fonts.fontCode,
  backgroundColor: colors.greyMidLight,
  fontSize: normalize(9),
};
const linkStyle = { ...boldStyle, color: colors.primaryDark };

const styles = {
  b: boldStyle,
  strong: boldStyle,
  i: italicStyle,
  em: italicStyle,
  u: underlineStyle,
  pre: { ...codeStyle, padding: 5, marginBottom: 10 },
  code: codeStyle,
  span: textStyle,
  p: { ...textStyle, margin: 0, padding: 0 },
  h1: {
    ...fonts.fontPrimarySemiBold,
    ...hrStyle,
    fontSize: normalize(24),
  },
  h2: {
    ...fonts.fontPrimarySemiBold,
    ...hrStyle,
    fontSize: normalize(20),
  },
  h3: { ...fonts.fontPrimarySemiBold, fontSize: normalize(18) },
  h4: { ...fonts.fontPrimarySemiBold, fontSize: normalize(16) },
  h5: { ...fonts.fontPrimarySemiBold, fontSize: normalize(14) },
  h6: { ...fonts.fontPrimarySemiBold, fontSize: normalize(12) },
  hr: { ...hrStyle },
  li: textStyle,
  a: linkStyle,
};

const styleSheet = StyleSheet.create(styles);

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

const { height, width } = Dimensions.get('window');

const headingRenderer = (node, index, siblings, parent, defaultRenderer) => {
  const style = node.name === 'h1' || node.name === 'h2' ? { ...hrStyle } : {};

  return (
    <View key={index} style={style}>
      <Text style={{ ...styles[node.name] }}>
        {defaultRenderer(node.children, node)}
      </Text>
    </View>
  );
};

export class MarkdownHtmlView extends Component {
  props: {
    source: String,
    onLinkPress: Function,
  };

  transformMarkdown = md => {
    const issueReference = /(\s)#(\d+)/;
    const profileReference = /(\s)@([_0-9A-Za-z]+)/;
    const todoItem = /<li>\s*\[(x|\s)?\](.*)<\/li>/g;
    const emojiMarkup = /:(\w+):/g;

    return marked(md)
      .replace(/<p>*>/g, '<span>')
      .replace(/<\/p>*>/g, '</span>')
      .replace(/<ul>[\n]*?<li>/g, '<ul><li>')
      .replace(/<\/li>[\n]*?<\/ul>/g, '</li></ul>')
      .replace(/<ol>[\n]*?<li>/g, '<ol><li>')
      .replace(/<\/li>[\n]*?<\/ol>/g, '</li></ol>')
      .replace(/><li>/g, '>\n<li>')
      .replace(/<\/li><\/ul>\n/g, '</li></ul>')
      .replace(issueReference, (match, spacing, number) => {
        return `${spacing}<issue class="issue-link" data-id="${number}" />`;
      })
      .replace(profileReference, (match, spacing, username) => {
        return `${spacing}<profile class="user-mention">@${username}</profile>`;
      })
      .replace(todoItem, (match, type, contents) => {
        return `${type.trim()
          ? emojis.white_check_mark
          : emojis.white_large_square} ${contents}`;
      })
      .replace(emojiMarkup, text => {
        const emoji = text.replace(/:/g, '');

        return emojis[emoji] ? emojis[emoji] : text;
      })
      .replace(/<img([^>]+?)>/, (match, img) => {
        return `</span><img ${img}/><span>`;
      });
  };

  render() {
    const myDomElement = (
      _node,
      _index,
      _siblings,
      _parent,
      _defaultRenderer
    ) => {
      /* eslint-disable no-unused-vars */
      const onLinkPress = this.props.onLinkPress;
      const renderers = {
        blockquote: (node, index, siblings, parent, defaultRenderer) => {
          return (
            <View
              key={index}
              style={{
                paddingHorizontal: 12,
                borderLeftWidth: 3,
                borderLeftColor: colors.greyMid,
              }}
            >
              <Text
                style={{
                  color: colors.greyBlue,
                  ...fonts.fontPrimaryLight,
                }}
              >
                {defaultRenderer(node.children, parent)}
              </Text>
            </View>
          );
        },
        pre: (node, index, siblings, parent, defaultRenderer) => {
          return (
            <View>
              {defaultRenderer(node.children, node)}
            </View>
          );
        },
        code: (node, index, siblings, parent, defaultRenderer) => {
          if (parent.name === 'pre') {
            return (
              <SyntaxHighlighter
                style={{ ...GithubStyle }}
                CodeTag={Text}
                fontFamily={fonts.fontCode.fontFamily}
              >
                {node.children[0].data.trim()}
              </SyntaxHighlighter>
            );
          }

          return undefined;
        },
        h1: headingRenderer,
        h2: headingRenderer,
        h3: headingRenderer,
        h4: headingRenderer,
        h5: headingRenderer,
        h6: headingRenderer,
        hr: (node, index, siblings, parent, defaultRenderer) => {
          return <View key={index} style={{ ...hrStyle }} />;
        },
        img: (node, index, siblings, parent, defaultRenderer) => {
          return (
            <ImageZoom
              key={index}
              style={{ width: width * 0.5, height: height * 0.3 }}
              uri={{ uri: node.attribs.src }}
            />
          );
        },
        table: (node, index, siblings, parent, defaultRenderer) => {
          return (
            <Table key={index} style={{ width: width * 0.8 }}>
              {defaultRenderer(
                node.children.filter(elem => elem.type === 'tag'),
                node
              )}
            </Table>
          );
        },
        thead: (node, index, siblings, parent, defaultRenderer) => {
          return defaultRenderer(
            node.children.filter(elem => elem.type === 'tag'),
            node
          );
        },
        tbody: (node, index, siblings, parent, defaultRenderer) => {
          return defaultRenderer(
            node.children.filter(elem => elem.type === 'tag'),
            node
          );
        },
        tr: (node, index, siblings, parent, defaultRenderer) => {
          return (
            <TableWrapper
              key={index}
              style={{ width: width * 0.8, height: 30, flexDirection: 'row' }}
            >
              {defaultRenderer(
                node.children.filter(elem => elem.type === 'tag'),
                node
              )}
            </TableWrapper>
          );
        },
        td: (node, index, siblings, parent, defaultRenderer) => {
          const attribs = node.attribs;
          const cellAlign = {
            'text-align:right': 'right',
            'text-align:center': 'center',
          };
          const styleText = {
            marginLeft: 5,
            marginRight: 5,
          };

          if (cellAlign[attribs.style]) {
            styleText.textAlign = cellAlign[attribs.style];
          }

          return (
            <Cell
              key={index}
              data={defaultRenderer(node.children, node)}
              textStyle={styleText}
            />
          );
        },
        th: (node, index, siblings, parent, defaultRenderer) => {
          return (
            <Cell
              key={index}
              data={node.children[0].data}
              textStyle={{ ...fonts.fontPrimarySemiBold, textAlign: 'center' }}
            />
          );
        },
        issue: (node, index, siblings, parent, defaultRenderer) => {
          return (
            <Text style={styles.strong} onPress={() => onLinkPress(node)}>
              #{node.attribs['data-id']}
            </Text>
          );
        },
        profile: (node, index, siblings, parent, defaultRenderer) => {
          return (
            <Text style={styles.strong} onPress={() => onLinkPress(node)}>
              {node.children[0].data}
            </Text>
          );
        },
      };

      if (_node.type === 'text') {
        if (_node.data === '\n') {
          return (
            <Text style={{ height: 8, fontSize: normalize(8), width: 2 }}>
              {_node.data}
            </Text>
          );
        }
      } else if (renderers[_node.name]) {
        return renderers[_node.name](
          _node,
          _index,
          _siblings,
          _parent,
          _defaultRenderer
        );
      }

      return undefined;
    };

    return (
      <HTMLView
        value={this.transformMarkdown(this.props.source)}
        stylesheet={styleSheet}
        renderNode={myDomElement}
        textComponentProps={{ style: { ...textStyle } }}
      />
    );
  }
}
