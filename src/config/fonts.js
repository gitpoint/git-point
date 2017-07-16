import { Platform } from 'react-native';

const iosFonts = {
  fontPrimaryLight: { fontFamily: 'AvenirNext-Regular' },
  fontPrimary: { fontFamily: 'AvenirNext-Medium' },
  fontPrimarySemiBold: { fontFamily: 'AvenirNext-DemiBold' },
  fontPrimaryBold: { fontFamily: 'AvenirNext-Bold' },
  fontCode: { fontFamily: 'Menlo' },
};

const androidFonts = {
  fontPrimaryLight: { fontFamily: 'sans-serif-light' },
  fontPrimary: { fontFamily: 'sans-serif' },
  fontPrimarySemiBold: { fontFamily: 'sans-serif-medium' },
  fontPrimaryBold: { fontFamily: 'sans-serif-medium' },
  fontCode: { fontFamily: 'Roboto' },
};

export const fonts = Platform.OS === 'ios' ? iosFonts : androidFonts;
