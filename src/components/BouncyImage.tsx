import React, {useEffect} from 'react';
import {ImageProps} from 'react-native';
import Animated, {
  AnimateProps,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const BouncyImage = (props: AnimateProps<ImageProps> & ImageProps) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(0, {duration: 2000, easing: Easing.inOut(Easing.sin)}),
        withTiming(20, {duration: 2000, easing: Easing.inOut(Easing.sin)}),
      ),
      -1,
      true,
    );
  }, [translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <Animated.Image
      entering={props.entering}
      source={props.source}
      resizeMode="contain"
      style={[animatedStyle, {width: props.width, height: props.height}]}
    />
  );
};

export default BouncyImage;
