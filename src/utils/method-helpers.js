import { Platform, Linking } from 'react-native';
import SafariView from 'react-native-safari-view';

export const openURLInView = url => {
  // Use SafariView on iOS
  if (Platform.OS === 'ios') {
    SafariView.show({
      url,
      fromBottom: true,
    });
  } else {
    Linking.openURL(url);
  }
};
