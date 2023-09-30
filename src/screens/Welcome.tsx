import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Linking, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import TypeWriter from 'react-native-typewriter';
import LogoGradient from '../components/LogoGradient';
import {Colors} from '../models/Colors';

const Welcome = () => {
  const nav = useNavigation();

  const next = () => {
    nav.navigate('SelectServices' as never);
  };

  const openTos = () => {
    Linking.openURL('https://safeimnetz.at/nutzungsbedingungen.html');
  };

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
          marginTop: 150,
        }}>
        <Animated.Image
          entering={FadeInDown.duration(1000)}
          source={require('./../assets/Text_White.png')}
          resizeMode="contain"
          style={{width: 300, height: 150}}
        />
      </View>

      <SafeAreaView
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          marginBottom: 60,
          paddingHorizontal: 30,
        }}>
        <Animated.View entering={FadeInDown.duration(1000).delay(100)}>
          <TypeWriter typing={1} fixed style={{color: 'white', fontWeight: '600', fontSize: 16}}>
            Die App für mehr Sicherheit{'\n'}und Privatsphäre im Internet.
          </TypeWriter>
          <Animated.View entering={FadeInDown.duration(1000).delay(5000)}>
            <Text style={{color: 'white', marginTop: 20}}>
              Mit der Safe im Netz-App kannst du ganz einfach und spielerisch deine Cyber-Sicherheit verbessern.{'\n\n'}
              Wähle dazu im nächsten Schritt alle Dienste aus, die du verwendest. Die App erstellt dir dann eine
              Checkliste an Aufgaben, auch Tasks genannt, welche du erledigen (aber auch ignorieren) kannst, um besser
              gegen die Gefahren im Internet gewappnet zu sein.
            </Text>
          </Animated.View>
        </Animated.View>
        <Animated.View entering={FadeInDown.duration(1000).delay(6500)}>
          <TouchableOpacity
            onPress={() => next()}
            style={{
              height: 55,
              width: '100%',
              backgroundColor: 'white',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 80,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 17, color: Colors.primary}}>Los geht's</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openTos()}>
            <Text style={{color: 'white', fontSize: 12, textAlign: 'center', marginTop: 10}}>
              Damit akzeptierst du die <Text style={{textDecorationLine: 'underline'}}>Nutzungsbedingungen</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default Welcome;
