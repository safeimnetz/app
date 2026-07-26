import React, {useEffect} from 'react';
import {Image, ImageProps} from 'react-native';
import Animated, {
  AnimatedProps,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const BouncyImage = (props: AnimatedProps<ImageProps> & ImageProps) => {
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
    <Animated.View entering={props.entering}>
      <Animated.View style={[animatedStyle, {width: props.width, height: props.height}]}>
        <Image source={props.source} resizeMode="contain" style={{width: '100%', height: '100%'}} />
      </Animated.View>
    </Animated.View>
  );
};

export default BouncyImage;
