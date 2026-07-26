import React from 'react';
import {View} from 'react-native';
import {Ionicons as Icon} from '@expo/vector-icons';
import {Colors} from '../models/Colors';

const RoundCheckmark = (props: {isDone?: boolean}) => {
  return (
    <View
      style={{
        width: 25,
        height: 25,
        borderRadius: 100,
        borderWidth: 1.5,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.isDone ? Colors.primary : '#fff',
      }}>
      <Icon color="#fff" size={18} name="checkmark-outline" />
    </View>
  );
};

export default RoundCheckmark;
