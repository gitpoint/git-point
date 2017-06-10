import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import FastImage from "react-native-fast-image";
import { Card, Icon } from "react-native-elements";

import { ViewContainer, LoadingContainer } from "components";

import config from "config";

import { connect } from "react-redux";
import { getRepositoryFile } from "../repository.action";

const mapStateToProps = state => ({
  fileContent: state.repository.fileContent,
  isPendingFile: state.repository.isPendingFile
});

const mapDispatchToProps = dispatch => ({
  getRepositoryFile: url => dispatch(getRepositoryFile(url))
});

class RepositoryFile extends Component {
  props: {
    getRepositoryFile: Function,
    fileContent: any,
    isPendingFile: boolean,
    navigation: Object
  };

  constructor() {
    super();

    this.state = {
      imageWidth: null,
      imageHeight: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const content = navigation.state.params.content;
    const fileType = content.name.split(".").pop();

    if (!this.isImage(fileType)) {
      this.props.getRepositoryFile(content.download_url);
    } else {
      this.setImageSize(content.download_url);
    }
  }

  setImageSize = uri => {
    Image.getSize(uri, (imageWidth, imageHeight) => {
      if (imageWidth > Dimensions.get("window").width) {
        this.setState({
          imageWidth: Dimensions.get("window").width,
          imageHeight: 400
        });
      } else {
        this.setState({ imageWidth, imageHeight });
      }
    });
  };
  isImage(fileType) {
    return (
      fileType === "gif" ||
      fileType === "png" ||
      fileType === "jpg" ||
      fileType === "jpeg" ||
      fileType === "psd" ||
      fileType === "svg"
    );
  }

  render() {
    const { fileContent, isPendingFile, navigation } = this.props;
    const fileType = navigation.state.params.content.name.split(".").pop();

    return (
      <ViewContainer>

        {isPendingFile && <LoadingContainer animating={isPendingFile} center />}

        {!isPendingFile &&
          <Card
            containerStyle={styles.contentContainer}
            dividerStyle={styles.dividerStyle}
          >
            <ScrollView>
              <View style={styles.header}>
                <Icon
                  containerStyle={styles.branchIcon}
                  name="git-branch"
                  type="octicon"
                  size={22}
                />
                <Text style={styles.headerText}>
                  master
                </Text>
              </View>

              {!this.isImage(fileType) &&
                <View style={styles.content}>
                  <ScrollView
                    automaticallyAdjustContentInsets={false}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <Text style={styles.contentText}>{fileContent}</Text>

                  </ScrollView>
                </View>}

              {this.isImage(fileType) &&
                <View style={styles.imageContainer}>
                  <FastImage
                    style={{
                      width: this.state.imageWidth,
                      height: this.state.imageHeight
                    }}
                    source={{
                      uri: navigation.state.params.content.download_url,
                      priority: FastImage.priority.high
                    }}
                  />
                </View>}
            </ScrollView>
          </Card>}

      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 0,
    marginTop: 25,
    marginBottom: 25
  },
  dividerStyle: {
    marginBottom: 0
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: config.colors.greyVeryLight,
    paddingHorizontal: 10
  },
  branchIcon: {
    marginRight: 5
  },
  headerText: {
    color: config.colors.primaryDark,
    fontFamily: "AvenirNext-DemiBold",
    fontSize: 14
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  contentText: {
    fontFamily: "Menlo",
    fontSize: 12
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 400
  }
});

export const RepositoryFileScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryFile);
