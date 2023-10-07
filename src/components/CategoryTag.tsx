import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../models/Colors';

const CategoryTag = (props: {text?: string}) => {
  return (
    <View
      style={{
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderRadius: 7,
      }}>
      <Text style={{color: '#fff', fontWeight: '600'}}>{props.text}</Text>
    </View>
  );
};

export default CategoryTag;
