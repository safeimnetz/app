import React from 'react';
import {View} from 'react-native';

const CustomCopilotView = (props: {children: React.ReactElement; copilot?: any}) => {
  return <View {...props.copilot}>{props.children}</View>;
};

export default CustomCopilotView;
