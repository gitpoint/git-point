import React, {Component, PropTypes} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';

import ViewContainer from '../components/ViewContainer';
import UserProfile from '../components/UserProfile';
import LoadingMembersList from '../components/LoadingMembersList';
import MembersList from '../components/MembersList';
import SectionList from '../components/SectionList';
import ParallaxScroll from '../components/ParallaxScroll';

import colors from '../config/colors';
import Communications from 'react-native-communications';

import {connect} from 'react-redux';
import {getOrg, getOrgRepos, getOrgMembers} from '../actions/organization';

const mapStateToProps = state => ({
  organization: state.organization.organization,
  repositories: state.organization.repositories,
  members: state.organization.members,
  isPendingOrg: state.organization.isPendingOrg,
  isPendingRepos: state.user.isPendingRepos,
  isPendingMembers: state.user.isPendingMembers,
});

const mapDispatchToProps = dispatch => ({
  getOrg: orgName => dispatch(getOrg(orgName)),
  getOrgRepos: url => dispatch(getOrgRepos(url)),
  getOrgMembers: orgName => dispatch(getOrgMembers(orgName)),
});

class Organization extends Component {
  componentDidMount() {
    const organization = this.props.navigation.state.params.organization;

    this.props.getOrg(organization.login);
    this.props.getOrgMembers(organization.login);
  }

  render() {
    const {
      organization,
      members,
      isPendingOrg,
      isPendingMembers,
      navigation,
    } = this.props;

    const initialOrganization = this.props.navigation.state.params.organization;

    return (
      <ViewContainer barColor="light">

        <ParallaxScroll
          renderContent={() => (
            <UserProfile
              type="org"
              initialUser={initialOrganization}
              user={
                initialOrganization.login === organization.login
                  ? organization
                  : {}
              }
              navigation={navigation}
            />
          )}
          stickyTitle={organization.name}
          navigateBack
          navigation={navigation}
        >

          {isPendingMembers && <LoadingMembersList title="MEMBERS" />}

          {!isPendingMembers &&
            <MembersList
              title="MEMBERS"
              members={members}
              navigation={navigation}
            />}

          {!isPendingOrg &&
            organization.blog &&
            <SectionList title="LINKS">
              {organization.blog &&
                <ListItem
                  title="Website"
                  titleStyle={styles.listTitle}
                  leftIcon={{name: 'link', color: colors.grey}}
                  subtitle={organization.blog}
                  onPress={() => Communications.web(organization.blog)}
                  underlayColor={colors.greyLight}
                />}
            </SectionList>}
        </ParallaxScroll>
      </ViewContainer>
    );
  }
}

Organization.propTypes = {
  getOrg: PropTypes.func,
  getOrgRepos: PropTypes.func,
  getOrgMembers: PropTypes.func,
  organization: PropTypes.object,
  repositories: PropTypes.array,
  members: PropTypes.array,
  isPendingOrg: PropTypes.bool,
  isPendingRepos: PropTypes.bool,
  isPendingMembers: PropTypes.bool,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  listTitle: {
    color: colors.black,
    fontFamily: 'AvenirNext-Medium',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
