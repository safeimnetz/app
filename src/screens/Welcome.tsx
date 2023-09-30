import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import LogoGradient from '../components/LogoGradient';

const Welcome = () => {
  return (
    <View style={{flex: 1}}>
      <LogoGradient />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          alignItems: 'center',
          marginTop: 120,
        }}>
        <Image source={require('./../assets/Text_White.png')} resizeMode="contain" style={{width: 300, height: 150}} />
      </View>

      <SafeAreaView
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          alignItems: 'center',
          marginBottom: 60,
        }}>
        <TouchableOpacity
          style={{
            height: 55,
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 17, color: '#883D8C'}}>Los geht's</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Welcome;
