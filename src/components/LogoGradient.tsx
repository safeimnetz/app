import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../models/Colors';

const LogoGradient = () => {
  return <LinearGradient style={{flex: 1}} colors={[Colors.primary, Colors.secondary]} angle={45} useAngle />;
};

export default LogoGradient;
