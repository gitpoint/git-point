import DeviceInfo from 'react-native-device-info';

export const isIphoneX = () => DeviceInfo.getModel() === 'iPhone X';
