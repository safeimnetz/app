import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {Colors} from '../models/Colors';

const BUTTON_BORDER_RADIUS = 10;

const Button = (props: {
  isLoading?: boolean;
  disabled?: boolean;
  onPress: () => void;
  title: string;
  theme: 'primary' | 'light';
  style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={props.disabled ? 0.5 : undefined}
      onPress={() => {
        if (!props.disabled) {
          props.onPress();
        }
      }}
      style={{
        opacity: props.disabled ? 0.5 : 1,
        height: 55,
        width: '100%',
        backgroundColor: props.theme === 'light' ? '#fff' : Colors.primary,
        borderRadius: BUTTON_BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        ...props.style,
      }}>
      {!props.isLoading && (
        <Text style={{fontWeight: 'bold', fontSize: 17, color: props.theme === 'light' ? Colors.primary : '#fff'}}>
          {props.title}
        </Text>
      )}
      {props.isLoading && <ActivityIndicator color={Colors.primary} />}
    </TouchableOpacity>
  );
};

export default Button;
