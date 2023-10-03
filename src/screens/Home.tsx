import React from 'react';
import {ScrollView} from 'react-native';
import {Colors} from '../models/Colors';

const Home = () => {
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: Colors.scrollViewBackground}}
      contentContainerStyle={{paddingTop: 20}}></ScrollView>
  );
};

export default Home;
