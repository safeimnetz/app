import React from 'react';
import {ScrollView, View} from 'react-native';

const ScrollViewBackSwipe = (props: React.ComponentProps<typeof ScrollView>) => {
  return (
    <View style={{flex: 1}}>
      <ScrollView {...props} />
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: 25,
          left: 0,
        }}
      />
    </View>
  );
};

export default ScrollViewBackSwipe;
