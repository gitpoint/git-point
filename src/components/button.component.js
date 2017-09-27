import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Button as BaseButton } from 'react-native-elements';
import { colors, fonts, normalize } from 'config';

const types = {
  default: {
    buttonStyle: {
      borderColor: '#adadad',
      borderWidth: 1,
      backgroundColor: '#e6e6e6',
    },
    textStyle: {
      color: '#333333',
    },
    disabledStyle: {
      borderColor: '#cccccc',
      borderWidth: 1,
      backgroundColor: '#ffffff',
    },
  },
  danger: {
    buttonStyle: {
      borderColor: '#dc3545',
      borderWidth: 1,
      backgroundColor: '#c9302c',
    },
    disabledStyle: {
      borderColor: '#d43f3a',
      borderWidth: 1,
      backgroundColor: '#d9534f',
    },
  },
  warning: {
    buttonStyle: {
      borderColor: '#eea236',
      borderWidth: 1,
      backgroundColor: '#ec971f',
    },
    disabledStyle: {
      borderColor: '#eea236',
      borderWidth: 1,
      backgroundColor: '#f0ad4e',
    },
  },
  info: {
    buttonStyle: {
      borderColor: '#46b8da',
      borderWidth: 1,
      backgroundColor: '#31b0d5',
    },
    disabledStyle: {
      borderColor: '#46b8da',
      borderWidth: 1,
      backgroundColor: '#5bc0de',
    },
  },
  success: {
    buttonStyle: {
      borderColor: '#4cae4c',
      borderWidth: 1,
      backgroundColor: '#449d44',
    },
    disabledStyle: {
      borderColor: '#4cae4c',
      borderWidth: 1,
      backgroundColor: '#5cb85c',
    },
  },
  primary: {
    buttonStyle: {
      borderColor: '#2e6da4',
      borderWidth: 1,
      backgroundColor: '#286090',
    },
    disabledStyle: {
      borderColor: '#2e6da4',
      backgroundColor: '#337ab7',
    },
  },
};

const sizes = {
  small: {
    buttonStyle: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingEnd: 8,
      paddingLeft: 8,
      marginLeft: 4,
      marginRight: 4,
    },
    textStyle: {
      fontSize: normalize(12),
    },
    iconStyle: {
      size: 12,
    },
  },
  default: {
    buttonStyle: {
      paddingTop: 8,
      paddingBottom: 8,
      paddingRight: 14,
      paddingLeft: 14,
      marginLeft: 6,
      marginRight: 6,
    },
    textStyle: {
      fontSize: normalize(14),
    },
    iconStyle: {
      size: 16,
    },
  },
  large: {
    buttonStyle: {
      paddingTop: 13,
      paddingBottom: 13,
      paddingRight: 17,
      paddingLeft: 17,
      marginLeft: 8,
      marginRight: 8,
    },
    textStyle: {
      fontSize: normalize(16),
    },
    iconStyle: {
      size: 20,
    },
  },
};

const defaultButtonStyle = {
  borderWidth: 1,
  borderRadius: 2,
};

const defaultTextStyle = Platform.select({
  android: {
    ...fonts.fontPrimarySemiBold,
  },
  ios: {
    ...fonts.fontPrimarySemiBold,
  },
  color: colors.white,
});

const defaultIconStyle = {
  style: {
    marginRight: 4,
  },
};

const defaultDisabledStyle = {
  borderWidth: 1,
};

export class Button extends Component {
  props: {
    icon: string,
    size: string,
    type: string,
    title: string,
    disabled: boolean,
  };

  render() {
    const size = this.props.size;
    const type = this.props.type;
    const icon = this.props.icon;
    const title = this.props.title;

    const isAndroid = Platform.OS === 'android';

    const disabledStyle = this.props.disabled
      ? { ...defaultDisabledStyle, ...types[type].disabledStyle }
      : {};

    return (
      <BaseButton
        {...this.props}
        title={isAndroid ? title.toUpperCase() : title}
        raised={isAndroid}
        buttonStyle={{
          ...defaultButtonStyle,
          ...types[type].buttonStyle,
          ...sizes[size].buttonStyle,
        }}
        textStyle={{
          ...defaultTextStyle,
          ...types[type].textStyle,
          ...sizes[size].textStyle,
        }}
        disabledStyle={disabledStyle}
        icon={
          icon && { ...defaultIconStyle, ...sizes[size].iconStyle, ...icon }
        }
      />
    );
  }
}

Button.defaultProps = {
  size: 'default',
  icon: false,
  type: 'default',
  title: 'missing title!',
};
