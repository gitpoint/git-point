import React, {Component, PropTypes} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {ButtonGroup, Card} from 'react-native-elements';

import ViewContainer from '../components/ViewContainer';
import LoadingContainer from '../components/LoadingContainer';

import colors from '../config/colors';

import {connect} from 'react-redux';
import {getUnreadNotifications, getParticipatingNotifications, getAllNotifications} from '../actions/notifications';

const mapStateToProps = state => ({
  unread: state.notifications.unread,
  participating: state.notifications.participating,
  all: state.notifications.all,
  isPendingUnread: state.user.isPendingUnread,
  isPendingParticipating: state.user.isPendingParticipating,
  isPendingAll: state.user.isPendingAll,
});

const mapDispatchToProps = dispatch => ({
  getUnreadNotifications: () => dispatch(getUnreadNotifications()),
  getParticipatingNotifications: () => dispatch(getParticipatingNotifications()),
  getAllNotifications: () => dispatch(getAllNotifications()),
});

class Notifications extends Component {
  constructor() {
    super();

    this.state = {
      type: 0,
    };

    this.switchType = this.switchType.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  componentDidMount() {
    this.props.getUnreadNotifications();
  }

  switchType(selectedType) {
    if (this.state.type !== selectedType) {
      this.setState({
        type: selectedType,
      });
    }
  }

  renderHeader = () => {
    return (
      <ButtonGroup
        onPress={this.switchType}
        selectedIndex={this.state.searchType}
        buttons={['Unread', 'Participating', 'All']}
        textStyle={styles.buttonGroupText}
        selectedTextStyle={styles.buttonGroupTextSelected}
        containerStyle={styles.buttonGroupContainer}
      />
    )
  };

  compareNotificationTitle = (a,b) => {
    if (a.repository.full_name < b.repository.full_name)
      return -1;
    if (a.repository.full_name > b.repository.full_name)
      return 1;
    return 0;
  }

  renderItem = ({item}) => {
    return (
      <Card
        containerStyle={styles.fileChangeContainer}
        dividerStyle={styles.dividerStyle}
      >
        <View>
          <Text style={styles.fileTitle}>
            <Text style={[styles.fileTitle, styles.codeStyle]}>{item.to}</Text>
          </Text>
        </View>
        {item.chunks.length > 0 ? chunks : <Text style={styles.noChangesMessage}>File renamed without changes.</Text>}
      </Card>
    );
  };

  getNotifications() {
    const {unread, participating, all} = this.props;
    const {type} = this.state;

    switch (type) {
      case 0:
        return unread.sort(this.compareNotificationTitle);
      case 1:
        return participating.sort(this.compareNotificationTitle);
      case 2:
        return all;
    }
  }

  isLoading() {
    const {unread, participating, all, isPendingUnread, isPendingParticipating, isPendingAll} = this.props;
    const {type} = this.state;

    switch (type) {
      case 0:
        return unread && isPendingUnread;
      case 1:
        return participating && isPendingParticipating;
      case 2:
        return all && isPendingAll;
    }
  }

  render() {
    const {type} = this.state;
    
    return (
      <ViewContainer>
        {!this.isLoading() &&
          <FlatList
            ListHeaderComponent={this.renderHeader}
            removeClippedSubviews={false}
            data={this.getNotifications()}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            disableVirtualization={true}
          />
        }

        {this.isLoading() &&
          <LoadingContainer
            animating={this.isLoading()}
            text={`Retrieving ${type === 0 ? 'unread' : (type === 1 ? 'pending' : 'all')} notifications`}
            style={styles.marginSpacing}
          />
        }
      </ViewContainer>
    );
  }

  keyExtractor = item => {
    return item.id;
  };
}

Notifications.propTypes = {
  getUnreadNotifications: PropTypes.func,
  getParticipatingNotifications: PropTypes.func,
  getAllNotifications: PropTypes.func,
  unread: PropTypes.array,
  participating: PropTypes.array,
  all: PropTypes.array,
  isPendingUnread: PropTypes.bool,
  isPendingParticipating: PropTypes.bool,
  isPendingAll: PropTypes.bool,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  buttonGroupContainer: {
    height: 30,
  },
  buttonGroupText: {
    fontFamily: 'AvenirNext-Bold',
  },
  buttonGroupTextSelected: {
    color: colors.black,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
