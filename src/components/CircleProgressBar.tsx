import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {Easing, useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated';
import {Circle, Svg} from 'react-native-svg';
import {Colors} from '../models/Colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleProgressBar = (props: {percentage: number}) => {
  const strokeWidth = 10;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (props.percentage / 100) * circumference;

  const animatedProgress = useSharedValue(circumference);

  useEffect(() => {
    const animateProgress = () => {
      'worklet';
      animatedProgress.value = withTiming(progressOffset, {
        duration: 2000,
        easing: Easing.out(Easing.exp),
      });
    };
    animateProgress();
  }, [props.percentage, animatedProgress, progressOffset]);

  const animatedProps = useAnimatedProps(() => {
    'worklet';
    return {
      strokeDashoffset: animatedProgress.value,
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
        <Circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke="#cacaca"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <AnimatedCircle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke={Colors.primary}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          rotation="-90"
          origin={`${radius + strokeWidth / 2}, ${radius + strokeWidth / 2}`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{`${props.percentage.toFixed(0)}%`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CircleProgressBar;
