import { Animated } from 'react-native';
import React from 'react';

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

export const withFadeAnimation = WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.fadeFrom = 0.3;
      this.fadeTo = 0.6;
      this.state = {
        fadeAnimValue: new Animated.Value(this.fadeTo),
      };
    }

    componentDidMount() {
      this.runAnimation();
    }

    runAnimation() {
      const animatedTimings = [];
      const duration = 1000;

      animatedTimings.push(
        Animated.timing(this.state.fadeAnimValue, {
          toValue: this.fadeFrom,
          duration,
        })
      );
      animatedTimings.push(
        Animated.timing(this.state.fadeAnimValue, {
          toValue: this.fadeTo,
          duration,
        })
      );

      return Animated.sequence(animatedTimings).start(() => {
        this.runAnimation();
      });
    }

    render() {
      return <WrappedComponent opacity={this.state.fadeAnimValue} />;
    }
  };
};

export type FadeAnimationProps = {
  opacity: number,
};
