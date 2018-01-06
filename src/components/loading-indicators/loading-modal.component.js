import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const LoadingModal = () => (
  <Modal transparent onRequestClose={() => null}>
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  </Modal>
);
