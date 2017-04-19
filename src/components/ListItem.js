import React, { PropTypes } from 'react';
import { View, StyleSheet, TouchableHighlight, TextInput, Text } from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image'

import colors from '../config/colors';
import normalize from '../config/normalizeText';

const ListItem = props => {
  const {
    avatarUrl,
    onPress,
    title,
    leftIcon,
    rightIcon,
    leftIconContainerStyle,
    avatarStyle,
    underlayColor,
    subtitle,
    subtitleStyle,
    containerStyle,
    wrapperStyle,
    titleStyle,
    titleContainerStyle,
    hideChevron,
    chevronColor,
    roundAvatar,
    component,
    fontFamily,
    rightTitle,
    rightTitleContainerStyle,
    rightTitleStyle,
    subtitleContainerStyle,
    onLongPress,
    textInput,
    textInputAutoCapitalize,
    textInputAutoCorrect,
    textInputAutoFocus,
    textInputEditable,
    textInputKeyboardType,
    textInputMaxLength,
    textInputMultiline,
    textInputOnChangeText,
    textInputOnFocus,
    textInputOnBlur,
    textInputSelectTextOnFocus,
    textInputReturnKeyType,
    textInputValue,
    textInputStyle,
    textInputContainerStyle,
  } = props;

  let Component = onPress || onLongPress ? TouchableHighlight : View;
  if (component) {
    Component = component;
  }
  return (
    <Component
      onLongPress={onLongPress}
      onPress={onPress}
      underlayColor={underlayColor}
      style={[styles.container, containerStyle && containerStyle]}
    >
      <View style={[styles.wrapper, wrapperStyle && wrapperStyle]}>
        {
          leftIcon && leftIcon.name && (
            <View style={[styles.iconStyle, leftIconContainerStyle && leftIconContainerStyle]}>
              <Icon
                type={leftIcon.type}
                iconStyle={[styles.icon, leftIcon.style && leftIcon.style]}
                name={leftIcon.name}
                color={leftIcon.color || colors.grey4}
                size={leftIcon.size || 24}
              />
            </View>
          )
        }
        {
          avatarUrl && (
            <FastImage
              style={[
                styles.avatar,
                roundAvatar && {borderRadius: 17},
                avatarStyle && avatarStyle]}
              source={{
                uri: avatarUrl,
                priority: FastImage.priority.high,
              }}
            />
          )
        }
        <View style={styles.titleSubtitleContainer}>
          <View style={titleContainerStyle}>
            {(title && (typeof title === 'string' || typeof title === 'number')) ? (
              <Text
                style={[
                  styles.title,
                  !leftIcon && {marginLeft: 10},
                  titleStyle && titleStyle,
                  fontFamily && {fontFamily}
                ]}>{title}</Text>
            ) : (
              <View>
                {title}
              </View>
            )}
          </View>
          <View style={subtitleContainerStyle}>
            {(subtitle && (typeof subtitle === 'string' || typeof subtitle === 'number')) ? (
              <Text
                style={[
                  styles.subtitle,
                  !leftIcon && {marginLeft: 10},
                  subtitleStyle && subtitleStyle,
                  fontFamily && {fontFamily}
                ]}>{subtitle}</Text>
            ) : (
              <View>
                {subtitle}
              </View>
            )}
          </View>
        </View>
        {
          rightTitle && (rightTitle !== '') && !textInput && (
            <View style={[styles.rightTitleContainer, rightTitleContainerStyle]}>
              <Text style={[styles.rightTitleStyle, rightTitleStyle]}>{rightTitle}</Text>
            </View>
          )
        }
        {
          textInput && (
            <View style={[styles.rightTitleContainer, textInputContainerStyle]}>
              <TextInput
                style={[styles.textInputStyle, textInputStyle]}
                defaultValue={rightTitle}
                value={textInputValue}
                autoCapitalize={textInputAutoCapitalize}
                autoCorrect={textInputAutoCorrect}
                autoFocus={textInputAutoFocus}
                editable={textInputEditable}
                keyboardType={textInputKeyboardType}
                maxLength={textInputMaxLength}
                multiline={textInputMultiline}
                onChangeText={textInputOnChangeText}
                onFocus={textInputOnFocus}
                onBlur={textInputOnBlur}
                selectTextOnFocus={textInputSelectTextOnFocus}
                returnKeyType={textInputReturnKeyType}/>
            </View>
          )
        }
        {
          !hideChevron && (
            <View style={styles.chevronContainer}>
              <Icon
                type={rightIcon.type}
                iconStyle={rightIcon.style}
                size={28}
                name={rightIcon.name || 'chevron-right'}
                color={rightIcon.color || chevronColor}
              />
            </View>
          )
        }
      </View>
    </Component>
  );
};

ListItem.defaultProps = {
  underlayColor: 'white',
  chevronColor: colors.grey,
  rightIcon: {name: 'chevron-right'},
  hideChevron: false,
  roundAvatar: false,
  switchButton: false,
  textInputEditable: true
};

ListItem.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  avatarUrl: PropTypes.string,
  icon: PropTypes.any,
  onPress: PropTypes.func,
  rightIcon: PropTypes.object,
  underlayColor: PropTypes.string,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  subtitleStyle: PropTypes.any,
  containerStyle: PropTypes.any,
  wrapperStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  titleContainerStyle: PropTypes.any,
  hideChevron: PropTypes.bool,
  chevronColor: PropTypes.string,
  roundAvatar: PropTypes.bool,
  onSwitch: PropTypes.func,
  switchDisabled: PropTypes.bool,
  switchOnTintColor: PropTypes.string,
  switchThumbTintColor: PropTypes.string,
  switchTintColor: PropTypes.string,
  switched: PropTypes.bool,
  textInput: PropTypes.bool,
  textInputAutoCapitalize: PropTypes.bool,
  textInputAutoCorrect: PropTypes.bool,
  textInputAutoFocus: PropTypes.bool,
  textInputEditable: PropTypes.bool,
  textInputKeyboardType: PropTypes.oneOf(['default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable',
    'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search']),
  textInputMaxLength: PropTypes.number,
  textInputMultiline: PropTypes.bool,
  textInputOnChangeText: PropTypes.func,
  textInputOnFocus: PropTypes.func,
  textInputOnBlur: PropTypes.func,
  textInputSelectTextOnFocus: PropTypes.bool,
  textInputReturnKeyType: PropTypes.string,
  textInputValue: PropTypes.string,
  textInputStyle: PropTypes.any,
  textInputContainerStyle: PropTypes.any,
  component: PropTypes.any,
  fontFamily: PropTypes.string,
  rightTitle: PropTypes.string,
  rightTitleContainerStyle: View.propTypes.style,
  rightTitleStyle: Text.propTypes.style,
  subtitleContainerStyle: View.propTypes.style,
  onLongPress: PropTypes.func,
  leftIcon: PropTypes.object,
  leftIconContainerStyle: View.propTypes.style,
  avatarStyle: View.propTypes.style,
};

const styles = StyleSheet.create({
  avatar: {
    width: 34,
    height: 34,
    backgroundColor: colors.greyLight,
  },
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    backgroundColor: 'transparent'
  },
  wrapper: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  iconStyle: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginRight: 8
  },
  title: {
    fontSize: normalize(14),
    color: colors.black,
    fontFamily: 'AvenirNext-Medium',
  },
  subtitle: {
    color: colors.grey,
    fontSize: normalize(12),
    marginTop: 1,
    fontWeight: '600'
  },
  titleSubtitleContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  chevronContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  switchContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 5
  },
  rightTitleContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  rightTitleStyle: {
    marginRight: 5,
    color: colors.grey
  },
  textInputStyle: {
    height: 20,
    textAlign: 'right'
  }
});

export default ListItem;
