import React, { Component } from 'react';
import { StyleSheet, StatusBar, ScrollView, ActivityIndicator } from 'react-native';

import colors from '../config/colors';

import ViewContainer from '../components/ViewContainer';
import SearchInput from '../components/SearchInput';

import { List, ListItem } from 'react-native-elements'

export default class RepositoryCode extends Component {
  constructor() {
    super();

    this.state = {
      repository: '',
      contents: [],
      fetchingData: false
    }
  }

  componentDidMount() {
    const contentPath = this.props.navigation.state.params.content.name === 'Code' ? '' : this.props.navigation.state.params.content.path;

    this.fetchContents(contentPath);
  }

  fetchContents(path = '', branch = 'master') {
    this.setState({
      fetchingData: true,
    })

    const url = path === '' ? this.props.navigation.state.params.repository.contents_url.replace('{+path}', '').concat(`?ref=${branch}`) : this.props.navigation.state.params.content.url;

    fetch(url)
      .then((response) => response.json())
      .then((contents) => {
        const sortedContents = contents.sort((a, b) => {
            return (a.type === b.type) ? 0 : a.type === 'dir' ? -1 : 1;
        });

        this.setState({
          contents: sortedContents,
          fetchingData: false,
        })
      })
  }

  goToPath(content) {
    if (content.type === 'dir') {
      return this.props.navigation.navigate('RepositoryCode', {content: content, repository: this.state.repository});
    }
  }

  render() {
    return (
      <ViewContainer>
        <ScrollView contentOffset={{x: 0, y: 50}}>
          <SearchInput
            onChangeText={(text) => this.search(text)} />

          { this.state.fetchingData &&
            <ActivityIndicator
              animating={this.state.fetchingData}
              style={{height: 80}}
              size="large"
            />
          }

          { !this.state.fetchingData &&
            <List containerStyle={{marginTop: 0}}>
              {
                this.state.contents.map((content, i) => (
                  <ListItem
                    title={content.name}
                    leftIcon={{name: content.type === 'dir' ? 'folder-open' : 'insert-drive-file', color: colors.grey}}
                    titleStyle={content.type === 'dir' ? styles.titleBold : styles.title}
                    key={i}
                    onPress={() => this.goToPath(content)}
                    underlayColor={colors.greyLight}
                  />
                ))
              }
            </List>
          }
        </ScrollView>
      </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: 'AvenirNext-Regular',
  },
  titleBold: {
    color: colors.black,
    fontFamily: 'AvenirNext-DemiBold',
  },
});
