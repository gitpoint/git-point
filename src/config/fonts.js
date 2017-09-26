import { Platform } from 'react-native';

const iosFonts = {
  fontPrimaryLight: { fontFamily: 'AvenirNext-Regular' },
  fontPrimary: { fontFamily: 'AvenirNext-Medium' },
  fontPrimaryItalic: { fontFamily: 'AvenirNext-Italic' },
  fontPrimarySemiBold: { fontFamily: 'AvenirNext-DemiBold' },
  fontPrimaryBold: { fontFamily: 'AvenirNext-Bold' },
  fontCode: { fontFamily: 'Menlo' },
};

const androidFonts = {
  fontPrimaryLight: { fontFamily: 'OpenSans-Regular' },
  fontPrimary: { fontFamily: 'OpenSans-Regular' },
  fontPrimaryItalic: { fontFamily: 'OpenSans-Italic' },
  fontPrimarySemiBold: { fontFamily: 'OpenSans-SemiBold', fontWeight: '600' },
  fontPrimaryBold: { fontFamily: 'OpenSans-Bold', fontWeight: '700' },
  fontCode: { fontFamily: 'Menlo' },
};

export const fonts = Platform.OS === 'ios' ? iosFonts : androidFonts;
