import { Platform } from 'react-native';

const iosFonts = {
  fontPrimaryLight: { fontFamily: 'AvenirNext-Regular' },
  fontPrimary: { fontFamily: 'AvenirNext-Medium' },
  fontPrimarySemiBold: { fontFamily: 'AvenirNext-DemiBold' },
  fontPrimaryBold: { fontFamily: 'AvenirNext-Bold' },
  fontCode: { fontFamily: 'Menlo' },
};

const androidFonts = {
  fontPrimaryLight: { fontFamily: 'OpensSans-Light', fontWeight: '300' },
  fontPrimary: { fontFamily: 'OpensSans-Regular' },
  fontPrimarySemiBold: { fontFamily: 'OpensSans-SemiBold', fontWeight: '600' },
  fontPrimaryBold: { fontFamily: 'OpensSans-Bold', fontWeight: '700' },
  fontCode: { fontFamily: 'Menlo' },
};

export const fonts = Platform.OS === 'ios' ? iosFonts : androidFonts;
