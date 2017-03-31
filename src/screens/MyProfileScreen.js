import React, {Component, PropTypes} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';

import ViewContainer from '../components/ViewContainer';
import UserProfile from '../components/UserProfile';
import SectionList from '../components/SectionList';
import LoadingContainer from '../components/LoadingContainer';
import ParallaxScroll from '../components/ParallaxScroll';
import UserListItem from '../components/UserListItem';

import colors from '../config/colors';
import Communications from 'react-native-communications';

import {connect} from 'react-redux';
import {getUser, getOrgs} from '../actions/authUser';

const mapStateToProps = state => ({
  user: state.authUser.user,
  orgs: state.authUser.orgs,
  isPendingUser: state.authUser.isPendingUser,
  isPendingOrgs: state.authUser.isPendingOrgs,
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
  getOrgs: () => dispatch(getOrgs()),
});

class MyProfile extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getOrgs();
  }

  render() {
    const {user, orgs, isPendingUser, isPendingOrgs, navigation} = this.props;

    return (
      <ViewContainer barColor="light">

        {isPendingUser ||
          (isPendingOrgs &&
            <LoadingContainer animating={isPendingUser || isPendingOrgs} />)}

        {!isPendingUser &&
          !isPendingOrgs &&
          <ParallaxScroll
            renderContent={() => (
              <UserProfile
                type="user"
                initialUser={user}
                user={user}
                navigation={navigation}
              />
            )}
            stickyTitle={user.login}
          >

            {(user.email || user.blog) &&
              <SectionList title="LINKS">
                {user.email &&
                  <ListItem
                    title="Email"
                    titleStyle={styles.listTitle}
                    leftIcon={{name: 'email', color: colors.grey}}
                    subtitle={user.email}
                    subtitleStyle={styles.listSubTitle}
                    onPress={() =>
                      Communications.email([user.email], null, null, 'Hi!', '')}
                    underlayColor={colors.greyLight}
                  />}

                {user.blog &&
                  <ListItem
                    title="Website"
                    titleStyle={styles.listTitle}
                    leftIcon={{name: 'link', color: colors.grey}}
                    subtitle={user.blog}
                    subtitleStyle={styles.listSubTitle}
                    onPress={() => Communications.web(user.blog)}
                    underlayColor={colors.greyLight}
                  />}
              </SectionList>}

            <SectionList title="DETAILS">
              <ListItem
                title="Events"
                titleStyle={styles.listTitle}
                leftIcon={{name: 'track-changes', color: colors.grey}}
                underlayColor={colors.greyLight}
              />

              <ListItem
                title="Starred"
                titleStyle={styles.listTitle}
                leftIcon={{name: 'event-note', color: colors.grey}}
                underlayColor={colors.greyLight}
              />

              <ListItem
                title="Gists"
                titleStyle={styles.listTitle}
                leftIcon={{name: 'supervisor-account', color: colors.grey}}
                underlayColor={colors.greyLight}
              />
            </SectionList>

            {orgs.length > 0 &&
              <SectionList title="ORGANIZATIONS">
                {orgs.map((item, i) => (
                  <UserListItem key={i} user={item} navigation={navigation} />
                ))}
              </SectionList>}
          </ParallaxScroll>}
      </ViewContainer>
    );
  }
}

MyProfile.propTypes = {
  getUser: PropTypes.func,
  getOrgs: PropTypes.func,
  user: PropTypes.array,
  orgs: PropTypes.array,
  isPendingUser: PropTypes.bool,
  isPendingOrgs: PropTypes.bool,
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

const styles = StyleSheet.create({
  listTitle: {
    color: colors.black,
    fontFamily: 'AvenirNext-Medium',
  },
  listSubTitle: {
    color: colors.greyDark,
    fontFamily: 'AvenirNext-Medium',
  },
});
