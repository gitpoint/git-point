import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Index from '../index.android';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  const tree = renderer.create(<Index />);
});
