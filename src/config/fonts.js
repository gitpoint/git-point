import { Platform } from 'react-native';

export const fonts = Platform.select({
  ios: {
    fontPrimaryLight: { fontFamily: 'AvenirNext-Regular' },
    fontPrimary: { fontFamily: 'AvenirNext-Medium' },
    fontPrimaryItalic: { fontFamily: 'AvenirNext-Italic' },
    fontPrimarySemiBold: { fontFamily: 'AvenirNext-DemiBold' },
    fontPrimaryBold: { fontFamily: 'AvenirNext-Bold' },
    fontCode: { fontFamily: 'Menlo' },
  },
  android: {
    fontPrimaryLight: { fontFamily: 'OpenSans-Regular' },
    fontPrimary: { fontFamily: 'OpenSans-Regular' },
    fontPrimaryItalic: { fontFamily: 'OpenSans-Italic' },
    fontPrimarySemiBold: { fontFamily: 'OpenSans-SemiBold', fontWeight: '600' },
    fontPrimaryBold: { fontFamily: 'OpenSans-Bold', fontWeight: '700' },
    fontCode: { fontFamily: 'Menlo' },
  },
});
