import React from 'react';
import {View} from 'react-native';

const CustomCopilotView = (props: {children: JSX.Element; copilot?: any}) => {
  return <View {...props.copilot}>{props.children}</View>;
};

export default CustomCopilotView;
