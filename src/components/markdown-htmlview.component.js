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

const linkStyle = {
  ...fonts.fontPrimarySemiBold,
  color: colors.primaryDark,
};

const styles = StyleSheet.create({
  span: textStyle,
  p: {
    ...textStyle,
    padding: 0,
    margin: 0,
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
  h1: textStyle,
  h2: textStyle,
  h3: textStyle,
  h4: textStyle,
  li: textStyle,
  a: linkStyle,
});

const rendererStyles = {
  newLine: {
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
      <View
        key={index}
        style={{
          ...rendererStyles[node.name].wrapper,
          borderBottomColor: colors.greyMid,
        }}
      >
        <Text
          style={{
            ...fonts.fontPrimarySemiBold,
            ...rendererStyles[node.name].text,
            color: colors.primaryDark,
            paddingBottom: 4,
          }}
        >
          {defaultRenderer(node.children, parent)}
        </Text>
      </View>
    );
  },
};

/* eslint-disable no-unused-vars */
const renderers = {
  blockquote: {
    render: (navigation, node, index, siblings, parent, defaultRenderer) => {
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
    },
  },
  code: {
    render: (navigation, node, index, siblings, parent, defaultRenderer) => {
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
    },
  },
  h1: headingRenderer,
  h2: headingRenderer,
  h3: headingRenderer,
  h4: headingRenderer,
  h5: headingRenderer,
  h6: headingRenderer,
  hr: {
    render: (navigation, node, index, siblings, parent, defaultRenderer) => {
      return (
        <View
          key={index}
          style={{ height: 4, backgroundColor: colors.greyLight }}
        />
      );
    },
  },
  img: {
    render: (navigation, node, index, siblings, parent, defaultRenderer) => {
      return (
        <ImageZoom
          key={index}
          style={{ width: width * 0.5, height: height * 0.3 }}
          uri={{ uri: node.attribs.src }}
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
  p: {
    render: (navigation, node, index, siblings, parent, defaultRenderer) => {
      return (
        <View key={index} style={rendererStyles.p}>
          {defaultRenderer(node.children, parent)}
        </View>
      );
    },
  },
  pre: {
    render: (navigation, node, index, siblings, parent, defaultRenderer) => {
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
    let rendered = marked(md);

    // Transform issues & profiles references into a special markup for HTMLView
    rendered = rendered.replace(/(\s)#(\d+)/, (match, spacing, number) => {
      return `${spacing}<issue src="${number}" />`;
    });
    rendered = rendered.replace(
      /(\s)@([_0-9A-Za-z]+)/,
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
          return <Text style={rendererStyles.newLine} />;
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
        stylesheet={styles}
        renderNode={myDomElement}
        paragraphBreak="foo"
        addLineBreaks={false}
      />
    );
  }
}
