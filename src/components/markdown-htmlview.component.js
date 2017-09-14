import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, Platform } from 'react-native';
import HTMLView from 'react-native-htmlview';
import marked from 'marked';
import { Table, Row, Rows } from 'react-native-table-component';

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
  color: '#ff0000',
};
const italicStyle = { ...textStyle, ...fonts.fontPrimaryItalic };
const underlineStyle = { textDecorationLine: 'underline' };
const codeStyle = {
  ...fonts.fontCode,
  backgroundColor: colors.greyMidLight,
  fontSize: normalize(9),
};
const linkStyle = { ...boldStyle, color: '#ff00ff' };

const styles = {
  b: boldStyle,
  strong: boldStyle,
  i: italicStyle,
  em: italicStyle,
  u: underlineStyle,
  pre: { ...codeStyle, padding: 5 },
  code: codeStyle,
  span: textStyle,
  p: { ...textStyle, flexWrap: 'wrap', margin: 0, padding: 0 },
  h1: {
    ...fonts.fontPrimarySemiBold,
    ...underlineStyle,
    fontSize: normalize(24),
  },
  h2: {
    ...fonts.fontPrimarySemiBold,
    ...underlineStyle,
    fontSize: normalize(20),
  },
  h3: { ...fonts.fontPrimarySemiBold, fontSize: normalize(18) },
  h4: { ...fonts.fontPrimarySemiBold, fontSize: normalize(16) },
  h5: { ...fonts.fontPrimarySemiBold, fontSize: normalize(14) },
  h6: { ...fonts.fontPrimarySemiBold, fontSize: normalize(12) },
  li: textStyle,
  a: linkStyle,
};

const stylessheet = StyleSheet.create(styles);

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

const navigateToIssue = (navigation, number) => {
  const params = navigation.state.params;
  const issueURL = params.issue
    ? `${params.issue.repository_url}/issues/${number}`
    : params.issueURL.replace(/\d+$/, number);

  navigation.navigate('Issue', {
    issueURL,
  });
};

const navigateToProfile = (navigation, login) => {
  navigation.navigate('Profile', {
    user: { login },
  });
};

const headingRenderer = {
  render: (navigation, node, index, siblings, parent, defaultRenderer) => {
    return (
      <Text style={{ flex: 1, flexDirection: 'column' }} key={index}>
        <Text style={{ ...styles[node.name] }}>
          {defaultRenderer(node.children, node)}
        </Text>
        <Text
          style={{ height: 20, width: 20, backgroundColor: colors.greyLight }}
        >
          --
        </Text>
      </Text>
    );
  },
};

/* eslint-disable no-unused-vars */
const renderers = {
  blockquote: {
    render: (navigation, node, index, siblings, parent, defaultRenderer) => {
      return (
        <Text
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
        </Text>
      );
    },
  },
  h1: headingRenderer,
  h2: headingRenderer,
  hr: {
    render: (navigation, node, index, siblings, parent, defaultRenderer) => {
      return (
        <Text
          key={index}
          style={{ height: 4, width, backgroundColor: colors.greyLight }}
        />
      );
    },
  },
  img: {
    render: (navigation, node, index, siblings, parent, defaultRenderer) => {
      return (
        <View
          style={{ width: width * 0.5, height: height * 0.3, marginTop: 10 }}
        >
          <ImageZoom
            key={index}
            style={{ width: width * 0.5, height: height * 0.3 }}
            uri={{ uri: node.attribs.src }}
          />
        </View>
      );
    },
  },
  table: {
    render: (navigation, node, index, siblings, parent, defaultRenderer) => {
      return (
        <Table>
          {defaultRenderer(node.children, node)}
        </Table>
      );
    },
  },
  thead: {
    render: (navigation, node, index, siblings, parent, defaultRenderer) => {
      const values = [];

      node.children.forEach(row => {
        if (row.type === 'tag' && row.name === 'tr') {
          row.children.forEach(cell => {
            if (
              cell.type === 'tag' &&
              (cell.name === 'td' || cell.name === 'th')
            ) {
              values.push(cell.children[0].data);
            }
          });
        }
      });

      return (
        <Row
          data={values}
          style={{ width: width * 0.8, height: 40, backgroundColor: '#f1f8ff' }}
          textStyle={{ marginLeft: 5 }}
        />
      );
    },
  },
  tbody: {
    render: (navigation, node, index, siblings, parent, defaultRenderer) => {
      const values = [];

      node.children.forEach(row => {
        if (row.type === 'tag' && row.name === 'tr') {
          const sub = [];

          row.children.forEach(cell => {
            if (
              cell.type === 'tag' &&
              (cell.name === 'td' || cell.name === 'th')
            ) {
              sub.push(cell.children[0].data);
            }
          });

          values.push(sub);
        }
      });

      return (
        <Rows
          data={values}
          style={{ width: width * 0.8, height: 40 }}
          textStyle={{ marginLeft: 5 }}
        />
      );
    },
  },
  issue: {
    render: (navigation, node, index, siblings, parent, defaultRenderer) => {
      return (
        <Text
          style={styles.strong}
          onPress={() => navigateToIssue(navigation, node.attribs.src)}
        >
          #{node.attribs.src}
        </Text>
      );
    },
  },
  profile: {
    render: (navigation, node, index, siblings, parent, defaultRenderer) => {
      return (
        <Text
          style={styles.strong}
          onPress={() => navigateToProfile(navigation, node.attribs.src)}
        >
          @{node.attribs.src}
        </Text>
      );
    },
  },
};

export class MarkdownHtmlview extends Component {
  props: {
    source: String,
    navigation: Object,
  };

  transformMarkdown = md => {
    const issueReference = /(\s)#(\d+)/;
    const profileReference = /(\s)@([_0-9A-Za-z]+)/;

    let rendered = marked(md);

    rendered = rendered.replace(issueReference, (match, spacing, number) => {
      return `${spacing}<issue src="${number}" />`;
    });
    rendered = rendered.replace(
      profileReference,
      (match, spacing, username) => {
        return `${spacing}<profile src="${username}" />`;
      }
    );

    return rendered;
  };

  render() {
    const navigation = this.props.navigation;
    const myDomElement = (node, index, siblings, parent, defaultRenderer) => {
      if (node.type === 'text') {
        const checkBoxUnchecked = /^\s*\[\s?\]/;
        const checkBoxChecked = /^\s*\[x\]/i;
        const emojiMarkup = /:(\w+):/g;

        if (node.data === '\n') {
          return <Text style={{ height: 5, width: 5 }} />;
        }

        /* eslint-disable no-param-reassign */
        node.data = node.data.replace(
          checkBoxUnchecked,
          emojis.white_large_square
        );
        node.data = node.data.replace(checkBoxChecked, emojis.white_check_mark);
        node.data = node.data.replace(emojiMarkup, text => {
          const emoji = text.replace(/:/g, '');

          return emojis[emoji] ? emojis[emoji] : text;
        });

        return undefined;
      } else if (renderers[node.name]) {
        return renderers[node.name].render(
          navigation,
          node,
          index,
          siblings,
          parent,
          defaultRenderer
        );
      }

      return undefined;
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
    };

    return (
      <HTMLView
        value={this.transformMarkdown(this.props.source)}
        stylesheet={stylessheet}
        renderNode={myDomElement}
        textComponentProps={{ style: { ...textStyle } }}
        addLineBreaks={false}
      />
    );
  }
}
