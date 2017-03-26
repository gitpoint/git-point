import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import ViewContainer from '../components/ViewContainer';
import UserProfile from '../components/UserProfile';
import LoadingMembersList from '../components/LoadingMembersList';
import MembersList from '../components/MembersList';
import SectionList from '../components/SectionList';
import ParallaxScroll from '../components/ParallaxScroll';
import RepositoryListItem from '../components/RepositoryListItem';

import Communications from 'react-native-communications';
import {ListItem} from 'react-native-elements';
import colors from '../config/colors';

export default class Organization extends Component {
  constructor() {
    super();

    this.state = {
      organization: {},
      repositories: [],
      people: [],
      fetchingData: false,
    };
  }

  componentDidMount() {
    this.setState({
      fetchingData: true,
    });

    const organizationName = this.props.navigation.state.params.organization.login;

    fetch(`https://api.github.com/orgs/${organizationName}`)
      .then(response => response.json())
      .then(orgData => {
        fetch(orgData.repos_url)
          .then(response => response.json())
          .then(repos => {
            this.setState({
              organization: orgData,
              repositories: repos,
            });
          });

        fetch(`https://api.github.com/orgs/${organizationName}/public_members`)
          .then(response => response.json())
          .then(publicMembers => {
            this.setState({
              people: publicMembers,
              fetchingData: false,
            });
          });
      })
      .done();
  }

  render() {
    const initialOrganization = this.props.navigation.state.params.organization;

    return (
      <ViewContainer
        barColor="light">

        <ParallaxScroll
          renderContent={() => (
            <UserProfile
              type='org'
              initialUser={initialOrganization}
              user={!this.state.fetchingData && this.state.organization}
              navigation={this.props.navigation}
            />
          )}
          stickyTitle={this.state.organization.name}
          navigateBack
          navigation={this.props.navigation}
        >

          {this.state.fetchingData &&
            <LoadingMembersList
              title="MEMBERS"
            />
          }

          {!this.state.fetchingData &&
            <MembersList
              title="MEMBERS"
              members={this.state.people}
              navigation={this.props.navigation}
            />
          }

            {(this.state.organization.email || this.state.organization.blog) &&
              <SectionList
                title="LINKS">
                  {this.state.organization.email &&
                    <ListItem
                      title="Email"
                      titleStyle={styles.listTitle}
                      leftIcon={{name: 'email', color: colors.grey}}
                      subtitle={this.state.organization.email}
                      onPress={() => Communications.email([this.state.organization.email], null, null, 'Hi!', '')}
                      underlayColor={colors.greyLight}
                    />
                  }

                  {this.state.organization.blog &&
                    <ListItem
                      title="Website"
                      titleStyle={styles.listTitle}
                      leftIcon={{name: 'link', color: colors.grey}}
                      subtitle={this.state.organization.blog }
                      onPress={() => Communications.web(this.state.organization.blog)}
                      underlayColor={colors.greyLight}
                    />
                  }
              </SectionList>
            }

            {this.state.repositories.length > 0 &&
              <SectionList
                title="REPOSITORIES">
                {
                  this.state.repositories.map((item, i) => (
                    <RepositoryListItem
                      key={i}
                      repository={item}
                      navigation={this.props.navigation} />
                  ))
                }
              </SectionList>
            }
        </ParallaxScroll>
      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  listTitle: {
    color: colors.black,
    fontFamily: 'AvenirNext-Medium',
  },
});
