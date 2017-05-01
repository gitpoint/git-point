import React, {Component, PropTypes} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {ListItem} from 'react-native-elements';

import ViewContainer from '../components/ViewContainer';
import UserProfile from '../components/UserProfile';
import SectionList from '../components/SectionList';
import ParallaxScroll from '../components/ParallaxScroll';
import UserListItem from '../components/UserListItem';

import colors from '../config/colors';
import Communications from 'react-native-communications';

import {connect} from 'react-redux';
import {getUser, getOrgs} from '../actions/user';

const mapStateToProps = state => ({
  user: state.user.user,
  orgs: state.user.orgs,
  isPendingUser: state.user.isPendingUser,
  isPendingOrgs: state.user.isPendingOrgs,
});

const mapDispatchToProps = dispatch => ({
  getUser: user => dispatch(getUser(user)),
  getOrgs: user => dispatch(getOrgs(user)),
});

class Profile extends Component {
  componentDidMount() {
    this.props.getUser(this.props.navigation.state.params.user.login);
    this.props.getOrgs(this.props.navigation.state.params.user.login);
  }

  render() {
    const {user, orgs, isPendingUser, isPendingOrgs, navigation} = this.props;
    const initialUser = navigation.state.params.user;
    const isPending = isPendingUser || isPendingOrgs;

    return (
      <ViewContainer barColor="light">

        <ParallaxScroll
          renderContent={() => (
            <UserProfile
              type="user"
              initialUser={initialUser}
              user={initialUser.login === user.login ? user : {}}
              navigation={navigation}
            />
          )}
          stickyTitle={user.login}
          navigateBack
          navigation={navigation}
        >

          {isPending &&
            <ActivityIndicator
              animating={isPending}
              style={{height: 80}}
              size="large"
            />}

          {!isPending &&
            (user.email || user.blog) &&
            <SectionList title="LINKS">
              {user.email &&
                <ListItem
                  title="Email"
                  titleStyle={styles.listTitle}
                  leftIcon={{name: 'mail', color: colors.grey, type: 'octicon'}}
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
                  leftIcon={{name: 'link', color: colors.grey, type: 'octicon'}}
                  subtitle={user.blog}
                  subtitleStyle={styles.listSubTitle}
                  onPress={() => Communications.web(user.blog)}
                  underlayColor={colors.greyLight}
                />}
            </SectionList>}

          {/* {!isPending &&
            <SectionList title="DETAILS">
              <ListItem
                title="Events"
                titleStyle={styles.listTitle}
                leftIcon={{name: 'pencil', color: colors.grey, type: 'octicon'}}
                underlayColor={colors.greyLight}
              />

              <ListItem
                title="Starred "
                titleStyle={styles.listTitle}
                leftIcon={{name: 'star', color: colors.grey, type: 'octicon'}}
                underlayColor={colors.greyLight}
              />

              <ListItem
                title="Gists"
                titleStyle={styles.listTitle}
                leftIcon={{name: 'gist', color: colors.grey, type: 'octicon'}}
                underlayColor={colors.greyLight}
              />
            </SectionList>} */}

          {!isPending &&
            orgs.length > 0 &&
            <SectionList title="ORGANIZATIONS">
              {orgs.map((item, i) => (
                <UserListItem key={i} user={item} navigation={navigation} />
              ))}
            </SectionList>}
        </ParallaxScroll>
      </ViewContainer>
    );
  }
}

Profile.propTypes = {
  getUser: PropTypes.func,
  getOrgs: PropTypes.func,
  user: PropTypes.object,
  orgs: PropTypes.array,
  isPendingUser: PropTypes.bool,
  isPendingOrgs: PropTypes.bool,
  navigation: PropTypes.object,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
