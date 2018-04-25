import React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
`;

export const LoadingModal = () => (
  <Modal transparent onRequestClose={() => null}>
    <Container>
      <ActivityIndicator />
    </Container>
  </Modal>
);
