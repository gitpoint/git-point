import { Animated } from 'react-native';

export const loadingAnimation = state => {
  const duration = 500;
  const iterations = 10;
  let opacity1 = 0.3;
  let opacity2 = 0.7;
  const animatedTimings = [];

  for (let i = 0; i < iterations; i += 1) {
    animatedTimings.push(
      Animated.timing(state, { toValue: opacity1, duration })
    );
    const tempFrom = opacity2;

    opacity2 = opacity1;
    opacity1 = tempFrom;
  }

  return Animated.sequence(animatedTimings);
};

export const infiniteAnimation = (state, fromValue, toValue, onEnd) => {
  const animatedTimings = [];
  const duration = 1000;

  animatedTimings.push(
    Animated.timing(state, {
      toValue: fromValue,
      duration,
    })
  );
  animatedTimings.push(
    Animated.timing(state, {
      toValue,
      duration,
    })
  );

  return Animated.sequence(animatedTimings).start(() => {
    onEnd();
  });
};
