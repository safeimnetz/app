import React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationUtils} from '../utils/NavigationUtils';

const Home = () => {
  return (
    <View>
      <Text>Home works!</Text>
      <Button
        title="services auswählen"
        onPress={() => {
          NavigationUtils.navigate('SelectServices');
        }}></Button>
    </View>
  );
};

export default Home;
