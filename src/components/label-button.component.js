import { Button } from 'react-native-elements';
import styled from 'styled-components';

import { fonts } from 'config';
import { getFontColorByBackground } from 'utils';

export const LabelButton = styled(Button).attrs({
  title: ({ label }) => label.name,
  textStyle: fonts.fontPrimarySemiBold,
  fontSize: ({ largeWithTag }) => (largeWithTag ? 13 : 12),
  color: ({ label }) => getFontColorByBackground(label.color),
  buttonStyle: ({ largeWithTag }) => [
    {
      paddingVertical: largeWithTag ? 3 : 5,
      paddingHorizontal: largeWithTag ? 5 : 10,
      marginLeft: 0,
      borderRadius: 3,
    },
    !largeWithTag && {
      marginRight: 10,
      minWidth: 70,
    },
  ],
  backgroundColor: ({ label }) => `#${label.color}`,
  icon: props =>
    props.largeWithTag && {
      name: 'tag',
      type: 'octicon',
      color: getFontColorByBackground(props.label.color),
    },
})``;
