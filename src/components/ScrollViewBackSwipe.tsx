import React, {forwardRef} from 'react';
import {ScrollView, View} from 'react-native';

const ScrollViewBackSwipe = forwardRef<ScrollView, React.ComponentProps<typeof ScrollView>>((props, ref) => {
  return (
    <View style={{flex: 1}}>
      <ScrollView ref={ref} {...props} />
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
});

export default ScrollViewBackSwipe;
