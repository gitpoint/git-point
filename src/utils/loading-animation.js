import { Animated } from 'react-native';

export const loadingAnimation = state => {
  const duration = 500, iterations = 10;

  let opacity1 = 0.3, opacity2 = 0.7;

  const animatedTimings = [];
  for (let i = 0; i < iterations; i = i + 1) {
    animatedTimings.push(
      Animated.timing(state, {toValue: opacity1, duration: duration}),
    );
    const tempFrom = opacity2;
    opacity2 = opacity1;
    opacity1 = tempFrom;
  }
  return Animated.sequence(animatedTimings);
};
