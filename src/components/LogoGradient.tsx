import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {Colors} from '../models/Colors';

const LogoGradient = () => {
  return (
    <LinearGradient
      style={{flex: 1}}
      colors={[Colors.primary, Colors.secondary]}
      start={{x: 0.1464466, y: 0.8535534}}
      end={{x: 0.8535534, y: 0.1464466}}
    />
  );
};

export default LogoGradient;
