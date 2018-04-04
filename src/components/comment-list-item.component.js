// @flow
/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { GithubHtmlView } from 'components';
import { Icon } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';

import { translate, relativeTimeToNow } from 'utils';
import { colors, fonts, normalize } from 'config';
import { type userSchema } from 'api/schemas';

const Container = styled.View`
  padding: 10px 10px 0 0;
  background-color: transparent;
`;

const Header = styled.View`
  flex-direction: row;
  margin-left: 10;
  align-items: center;
`;

const AvatarContainer = styled.TouchableOpacity`
  background-color: ${colors.greyLight};
  border-radius: 17;
  width: 34;
  height: 34;
`;

const Avatar = styled.Image`
  border-radius: 17;
  width: 34;
  height: 34;
`;

const TitleSubtitleContainer = styled.View`
  justify-content: center;
  flex: 1;
  margin-left: 10;
`;

const DateContainer = styled.View`
  flex: 0.15;
  align-items: flex-end;
  justify-content: center;
`;

const LinkDescription = styled.Text`
  ${{ ...fonts.fontPrimaryBold }};
  font-size: ${normalize(13)};
  color: ${colors.primaryDark};
`;

const DateLabel = styled.Text`
  color: ${colors.greyDark};
`;

const CommentContainer = styled.View`
  padding-top: 5;
  margin-left: 54;
  border-bottom-color: ${colors.greyLight};
  border-bottom-width: 1;
  padding-bottom: ${props => (props.bottomPadding ? 15 : 0)};
`;

const CommentTextNone = styled.Text`
  ${{ ...fonts.fontPrimary }};
  color: ${colors.primaryDark};
  font-style: italic;
`;

const ActionButtonIconContainer = styled.View`
  padding: 5px 0 10px;
  align-items: flex-end;
  justify-content: center;
`;

const mapStateToProps = state => ({
  authUser: state.auth.user,
});

class CommentListItemComponent extends Component {
  props: {
    comment: Object,
    user: userSchema,
    onLinkPress: Function,
    onEditPress: Function,
    onDeletePress: Function,
    locale: string,
    navigation: Object,
    authUser: Object,
  };

  ActionSheet: ActionSheet;

  handlePress = (index: number) => {
    const { onDeletePress, onEditPress, comment } = this.props;

    if (index === 0) {
      onEditPress(comment);
    } else if (index === 1 && !comment.repository_url) {
      onDeletePress(comment);
    }
  };

  showMenu = () => {
    this.ActionSheet.show();
  };

  isIssueDescription = () =>
    Object.prototype.hasOwnProperty.call(this.props.comment, 'repository_url');

  commentActionSheetOptions = comment => {
    const { locale } = this.props;
    const actions = [translate('issue.comment.editAction', locale)];

    if (!comment.repository_url) {
      actions.push(translate('issue.comment.deleteAction', locale));
    }

    return actions;
  };

  render() {
    const {
      comment,
      user,
      locale,
      navigation,
      authUser,
      onLinkPress,
    } = this.props;

    const commentPresent = comment.body_html && comment.body_html !== '';

    const isActionMenuEnabled = user && authUser.login === user.login;

    return (
      <Container>
        <Header>
          {user && (
            <AvatarContainer
              onPress={() =>
                navigation.navigate(
                  authUser.login === user.login ? 'AuthProfile' : 'Profile',
                  {
                    user,
                  }
                )
              }
            >
              <Avatar
                source={{
                  uri: user.avatar_url,
                }}
              />
            </AvatarContainer>
          )}

          {user && (
            <TitleSubtitleContainer>
              <LinkDescription
                onPress={() =>
                  navigation.navigate(
                    authUser.login === user.login ? 'AuthProfile' : 'Profile',
                    {
                      user,
                    }
                  )
                }
              >
                {user.login}
              </LinkDescription>
            </TitleSubtitleContainer>
          )}

          <DateContainer>
            <DateLabel>{relativeTimeToNow(comment.created_at)}</DateLabel>
          </DateContainer>
        </Header>

        <CommentContainer bottomPadding={!isActionMenuEnabled}>
          {commentPresent ? (
            <GithubHtmlView
              source={comment.body_html}
              onLinkPress={onLinkPress}
            />
          ) : (
            <CommentTextNone>
              {translate('issue.main.noDescription', locale)}
            </CommentTextNone>
          )}

          {isActionMenuEnabled && (
            <ActionButtonIconContainer>
              <Icon
                color={colors.grey}
                size={20}
                name={'ellipsis-h'}
                type={'font-awesome'}
                onPress={this.showMenu}
              />
            </ActionButtonIconContainer>
          )}
        </CommentContainer>

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={translate('issue.comment.commentActions', locale)}
          options={[
            ...this.commentActionSheetOptions(comment),
            translate('common.cancel', locale),
          ]}
          cancelButtonIndex={this.commentActionSheetOptions(comment).length}
          onPress={this.handlePress}
        />
      </Container>
    );
  }
}

export const CommentListItem = connect(mapStateToProps)(
  CommentListItemComponent
);
