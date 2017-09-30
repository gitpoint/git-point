import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, Platform } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { TableWrapper, Table, Cell } from 'react-native-table-component';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { github as GithubStyle } from 'react-syntax-highlighter/dist/styles';
import entities from 'entities';

import { ImageZoom } from 'components';
import { colors, fonts, normalize } from 'config';

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
    fontSize: normalize(20),
  },
  h2: {
    ...fonts.fontPrimarySemiBold,
    ...hrStyle,
    fontSize: normalize(18),
  },
  h3: { ...fonts.fontPrimarySemiBold, fontSize: normalize(16) },
  h4: { ...fonts.fontPrimarySemiBold, fontSize: normalize(14) },
  h5: { ...fonts.fontPrimarySemiBold, fontSize: normalize(12) },
  h6: { ...fonts.fontPrimarySemiBold, fontSize: normalize(10) },
  hr: { ...hrStyle },
  li: textStyle,
  a: linkStyle,
};

const styleSheet = StyleSheet.create(styles);

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

/* eslint-disable no-shadow */
class CellWithImage extends Cell {
  render() {
    const { data, width, height, flex, style } = this.props;
    let borderWidth = 1;
    let borderColor = '#000';

    if (this.props.borderStyle && this.props.borderStyle.borderWidth) {
      borderWidth = this.props.borderStyle.borderWidth;
    }
    if (this.props.borderStyle && this.props.borderStyle.borderColor) {
      borderColor = this.props.borderStyle.borderColor;
    }

    return (
      <View
        style={[
          {
            alignItems: 'center',
            borderTopWidth: borderWidth,
            borderRightWidth: borderWidth,
            borderColor,
          },
          styles.cell,
          width && { width },
          height && { height },
          flex && { flex },
          !width && !flex && !height && { flex: 1 },
          style,
        ]}
      >
        {data}
      </View>
    );
  }
}

const cellForNode = node =>
  node.children.filter(elem => elem.type === 'tag' && elem.name === 'img')
    .length > 0
    ? CellWithImage
    : Cell;

const onlyTagsChildren = node =>
  node.children.filter(elem => elem.type === 'tag');

export class GithubHtmlView extends Component {
  props: {
    source: String,
    onLinkPress: Function,
  };

  prepareHtml = html => {
    const prepared = html
      // Basic markup cleanup
      .replace(/<p([^>]*)>/g, '<span$1>')
      .replace(/<\/p>*>/g, '</span>')
      // No carriage return after <li> of before </li>
      .replace(/<li( class="[^"]*")?>\n(.*)/g, '<li$1>$2')
      .replace(/\n<\/li>/g, '</li>')
      // task list
      .replace(
        /<li class="task-list-item">(<span>)?<input class="task-list-item-checkbox" disabled="" id="" type="checkbox"> ?\.? ?/g,
        '$1⬜ '
      )
      .replace(
        /<li class="task-list-item">(<span>)?<input checked="" class="task-list-item-checkbox" disabled="" id="" type="checkbox"> ?\.? ?/g,
        '$1✅ '
      )
      //      .replace(/<br>/g, '')
      // Remove links & spans around images
      .replace(/<a[^>]+><img([^>]+)><\/a>/g, '<img$1>')
      .replace(/<span[^>]*><img([^>]+)><\/span>/g, '<img$1>')
      // Break free from big spans
      .replace(/<br>\n<img([^>]+)>/g, '<br></span><img$1><span>');
    // Remove \n between <ul> and <li>
    //  .replace(/<ul>[\n]*?<li>/g, '<ul><li>')
    //  .replace(/<\/li>[\n]*?<\/ul>/g, '</li></ul>')
    // Remove \n between <ul> and <li>
    //  .replace(/<ol>[\n]*?<li>/g, '<ol><li>')
    //  .replace(/<\/li>[\n]*?<\/ol>/g, '</li></ol>')
    // Remove \n between <ul> and <li>
    //      .replace(/><li>/g, '>\n<li>')
    //      .replace(/<\/li><\/ul>\n/g, '</li></ul>')
    /* .replace(/<img([^>]+?)>/, (match, img) => {
        return `</span><img ${img}/><span>`;
      }) */

    /* console.log(
      '***********************************************************************'
    );
    console.log(
      '***********************************************************************'
    );
    console.log(
      '***********************************************************************'
    );
    console.log(
      '***********************************************************************'
    );
    console.log(
      '***********************************************************************'
    );
    console.log(
      '***********************************************************************'
    );
    console.log(html);
    console.log(
      '***********************************************************************'
    );
    console.log(
      '***********************************************************************'
    );
    console.log(prepared); */

    return prepared;

    /*    const issueReference = /(\W)#(\d+)/;
    const profileReference = /(\W)@([_0-9A-Za-z]+)/;
    const todoItem = /<li>\s*\[(x|\s)?\](.*)<\/li>/g;
    const emojiMarkup = /:(\w+):/g;

    const numericEntitiesSwap = '~~~ESCAPED_NUMERIC_ENTITY~~~';

    const m = marked(md)
      .replace(/&#/g, numericEntitiesSwap)
      .replace(issueReference, (match, spacing, number) => {
        return `${spacing}<issue class="issue-link" data-id="${number}"></issue>`;
      })
      .replace(new RegExp(numericEntitiesSwap, 'g'), '&#')
      .replace(/<p>*>/g, '<span>')
      .replace(/<\/p>*>/g, '</span>')
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

      console.log(m);

      return m; */
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
        blockquote: (node, index, siblings, parent, defaultRenderer) =>
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
          </View>,
        pre: (node, index, siblings, parent, defaultRenderer) =>
          <View key={index}>
            {defaultRenderer(node.children, node)}
          </View>,
        code: (node, index, siblings, parent, defaultRenderer) => {
          if (parent.name === 'pre') {
            return (
              <SyntaxHighlighter
                key={index}
                style={{ ...GithubStyle }}
                CodeTag={Text}
                fontFamily={fonts.fontCode.fontFamily}
              >
                {entities.decodeHTML(node.children[0].data).trim()}
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
        hr: (node, index, siblings, parent, defaultRenderer) =>
          <View key={index} style={{ ...hrStyle }} />,
        img: (node, index, siblings, parent, defaultRenderer) => {
          const zoom =
            parent && parent.type === 'tag' && parent.name === 'td' ? 0.3 : 0.6;

          return (
            <ImageZoom
              key={index}
              style={{ width: width * zoom, height: height * zoom }}
              uri={{ uri: node.attribs.src }}
            />
          );
        },
        table: (node, index, siblings, parent, defaultRenderer) =>
          <Table key={index} style={{ width: width * 0.8 }}>
            {defaultRenderer(onlyTagsChildren(node), node)}
          </Table>,
        thead: (node, index, siblings, parent, defaultRenderer) =>
          defaultRenderer(onlyTagsChildren(node), node),
        tbody: (node, index, siblings, parent, defaultRenderer) =>
          defaultRenderer(onlyTagsChildren(node), node),
        tr: (node, index, siblings, parent, defaultRenderer) =>
          <TableWrapper
            key={index}
            style={{ width: width * 0.8, flexDirection: 'row' }}
          >
            {defaultRenderer(onlyTagsChildren(node), node)}
          </TableWrapper>,
        td: (node, index, siblings, parent, defaultRenderer) => {
          const Component = cellForNode(node);
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
            <Component
              key={index}
              data={defaultRenderer(node.children, node)}
              textStyle={styleText}
            />
          );
        },
        th: (node, index, siblings, parent, defaultRenderer) => {
          const Component = cellForNode(node);

          return (
            <Component
              key={index}
              data={defaultRenderer(node.children, node)}
              textStyle={{ ...fonts.fontPrimarySemiBold, textAlign: 'center' }}
            />
          );
        },
        'g-emoji': (node, index, siblings, parent, defaultRenderer) => {
          return node.children[0].data;
        },
        a: (node, index, siblings, parent, defaultRenderer) => {
          return (
            <Text
              key={index}
              style={styles.strong}
              onPress={() => onLinkPress(node)}
            >
              {node.children[0].data}
            </Text>
          );
        },
      };

      if (_node.type === 'text') {
        if (_node.data === '\n') {
          return (
            <Text
              key={_index}
              style={{ height: 8, fontSize: normalize(8), width: 2 }}
            >
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
        value={this.prepareHtml(this.props.source)}
        stylesheet={styleSheet}
        renderNode={myDomElement}
        textComponentProps={{ style: { ...textStyle } }}
      />
    );
  }
}
