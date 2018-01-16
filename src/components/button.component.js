import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Button as BaseButton } from 'react-native-elements';
import { colors, fonts, normalize } from 'config';

const types = {
  default: {
    buttonStyle: {
      borderColor: '#adadad',
      backgroundColor: '#e6e6e6',
    },
    iconStyle: {
      color: '#333333',
    },
    textStyle: {
      color: '#333333',
    },
    disabledStyle: {
      borderColor: '#cccccc',
      backgroundColor: '#ffffff',
    },
  },
  danger: {
    buttonStyle: {
      borderColor: '#dc3545',
      backgroundColor: '#c9302c',
    },
    disabledStyle: {
      borderColor: '#d43f3a',
      backgroundColor: '#d9534f',
    },
  },
  warning: {
    buttonStyle: {
      borderColor: '#eea236',
      backgroundColor: '#ec971f',
    },
    disabledStyle: {
      borderColor: '#eea236',
      backgroundColor: '#f0ad4e',
    },
  },
  info: {
    buttonStyle: {
      borderColor: '#46b8da',
      backgroundColor: '#31b0d5',
    },
    disabledStyle: {
      borderColor: '#46b8da',
      backgroundColor: '#5bc0de',
    },
  },
  success: {
    buttonStyle: {
      borderColor: '#4cae4c',
      backgroundColor: '#449d44',
    },
    disabledStyle: {
      borderColor: '#4cae4c',
      backgroundColor: '#5cb85c',
    },
  },
  primary: {
    buttonStyle: {
      borderColor: '#2e6da4',
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

const defaultDisabledTextStyle = {
  color: '#d2d2d2',
};

const defaultContainerViewStyle = {
  borderRadius: 2,
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
    const { size, type, icon, title } = this.props;
    const isAndroid = Platform.OS === 'android';

    const disabledStyle = {
      ...defaultDisabledStyle,
      ...types[type].disabledStyle,
    };
    const disabledTextColor = this.props.disabled
      ? defaultDisabledTextStyle
      : {};

    return (
      <BaseButton
        {...this.props}
        title={isAndroid ? title.toUpperCase() : title}
        raised={isAndroid}
        containerViewStyle={defaultContainerViewStyle}
        buttonStyle={{
          ...defaultButtonStyle,
          ...types[type].buttonStyle,
          ...sizes[size].buttonStyle,
        }}
        textStyle={{
          ...defaultTextStyle,
          ...types[type].textStyle,
          ...sizes[size].textStyle,
          ...disabledTextColor,
        }}
        disabledStyle={disabledStyle}
        icon={
          icon && {
            ...defaultIconStyle,
            ...types[type].iconStyle,
            ...sizes[size].iconStyle,
            ...icon,
          }
        }
      />
    );
  }
}

Button.defaultProps = {
  size: 'default',
  type: 'default',
  title: 'missing title!',
};
