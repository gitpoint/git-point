import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import { Icon } from 'react-native-elements';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { getLanguage } from 'lowlight';
import { github as GithubStyle } from 'react-syntax-highlighter/dist/styles';

import { ViewContainer, LoadingContainer } from 'components';
import { colors, fonts, normalize } from 'config';
import { getRepositoryFile } from '../repository.action';

const mapStateToProps = state => ({
  fileContent: state.repository.fileContent,
  isPendingFile: state.repository.isPendingFile,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getRepositoryFile,
    },
    dispatch
  );

const styles = StyleSheet.create({
  contentContainer: {
    padding: 0,
    marginTop: 25,
    marginBottom: 25,
  },
  dividerStyle: {
    marginBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.greyVeryLight,
    paddingHorizontal: 10,
  },
  branchIcon: {
    marginRight: 2,
  },
  headerText: {
    color: colors.primaryDark,
    ...fonts.fontPrimarySemiBold,
    fontSize: normalize(12),
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contentText: {
    ...fonts.fontCode,
    fontSize: normalize(10),
  },
  contentCode: {
    paddingRight: 15,
    paddingBottom: 0,
  },
  codeContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
  },
});

const syntaxHighlighterStyle = {
  ...GithubStyle,
  hljs: {
    background: 'white',
  },
};

const { width } = Dimensions.get('window');

class RepositoryFile extends Component {
  props: {
    getRepositoryFile: Function,
    fileContent: any,
    isPendingFile: boolean,
    navigation: Object,
  };

  constructor(props) {
    super(props);

    this.state = {
      imageWidth: null,
      imageHeight: null,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const content = navigation.state.params.content;
    const fileType = content.name.split('.').pop();

    if (!this.isImage(fileType)) {
      this.props.getRepositoryFile(content.url);
    } else {
      this.setImageSize(content.download_url);
    }
  }

  setImageSize = uri => {
    Image.getSize(uri, (imageWidth, imageHeight) => {
      if (imageWidth > width) {
        this.setState({
          imageWidth: width,
          imageHeight: 400,
        });
      } else {
        this.setState({ imageWidth, imageHeight });
      }
    });
  };

  isImage = fileType => {
    return (
      fileType === 'gif' ||
      fileType === 'png' ||
      fileType === 'jpg' ||
      fileType === 'jpeg' ||
      fileType === 'psd' ||
      fileType === 'svg'
    );
  };

  isKnownType(fileType) {
    return getLanguage(fileType) && !this.isImage(fileType);
  }

  render() {
    const { fileContent, isPendingFile, navigation } = this.props;
    const fileType = navigation.state.params.content.name.split('.').pop();
    const isUnknownType =
      !this.isImage(fileType) && !this.isKnownType(fileType);

    return (
      <ViewContainer>
        {isPendingFile && <LoadingContainer animating={isPendingFile} center />}

        {!isPendingFile && (
          <ScrollView>
            <View style={styles.header}>
              <Icon
                containerStyle={styles.branchIcon}
                name="git-branch"
                type="octicon"
                size={18}
              />
              <Text style={styles.headerText}>master</Text>
            </View>

            {isUnknownType && (
              <View style={styles.content}>
                <ScrollView
                  automaticallyAdjustContentInsets={false}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                >
                  <Text style={styles.contentText}>{fileContent}</Text>
                </ScrollView>
              </View>
            )}

            {this.isKnownType(fileType) && (
              <View style={styles.codeContainer}>
                <SyntaxHighlighter
                  language={fileType}
                  CodeTag={Text}
                  codeTagProps={{ style: styles.contentCode }}
                  style={syntaxHighlighterStyle}
                  fontFamily={fonts.fontCode.fontFamily}
                  fontSize={styles.contentText.fontSize}
                >
                  {fileContent}
                </SyntaxHighlighter>
              </View>
            )}

            {this.isImage(fileType) && (
              <View style={styles.imageContainer}>
                <ImageBackground
                  style={{
                    width: this.state.imageWidth,
                    height: this.state.imageHeight,
                  }}
                  imageStyle={{
                    resizeMode: 'cover',
                  }}
                  source={require('assets/images/bg-checkered.png')}
                >
                  <Image
                    style={{
                      width: this.state.imageWidth,
                      height: this.state.imageHeight,
                      resizeMode: 'contain',
                    }}
                    source={{
                      uri: navigation.state.params.content.download_url,
                    }}
                  />
                </ImageBackground>
              </View>
            )}
          </ScrollView>
        )}
      </ViewContainer>
    );
  }
}

export const RepositoryFileScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryFile);
