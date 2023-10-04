import React from 'react';
import {Text, View} from 'react-native';
import {useCopilot} from 'react-native-copilot';
import {Colors} from '../../models/Colors';

const CustomStepNumberComponent = () => {
  const {currentStepNumber} = useCopilot();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 14,
        borderColor: '#FFFFFF',
        backgroundColor: Colors.primary,
      }}>
      <Text style={{fontSize: 14, backgroundColor: 'transparent', color: '#FFFFFF'}}>{currentStepNumber}</Text>
    </View>
  );
};

export default CustomStepNumberComponent;
