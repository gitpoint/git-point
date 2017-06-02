import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions } from "react-native";
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

  componentDidMount() {
    const { navigation } = this.props;
    const content = navigation.state.params.content;
    const fileType = content.name.split(".").pop();

    if (!fileType === "gif" && !fileType === "png") {
      this.props.getRepositoryFile(content.download_url);
    }
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

              {!fileType === "gif" &&
                !fileType === "png" &&
                <View style={styles.content}>
                  <ScrollView
                    automaticallyAdjustContentInsets={false}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <Text style={styles.contentText}>{fileContent}</Text>

                  </ScrollView>
                </View>}

              {!fileType === "gif" &&
                !fileType === "png" &&
                <View style={styles.imageContainer}>
                  <FastImage
                    style={styles.image}
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
    justifyContent: "center"
  },
  image: {
    height: 400,
    width: Dimensions.get("window").width
  }
});

export const RepositoryFileScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryFile);
