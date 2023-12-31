import React, {useState} from 'react';
import {Alert, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import TypeWriter from 'react-native-typewriter';
import {Config} from '../Config';
import BouncyImage from '../components/BouncyImage';
import Button from '../components/Button';
import LogoGradient from '../components/LogoGradient';
import {_taskService} from '../services/TaskService';
import {LinkingUtils} from '../utils/LinkingUtils';
import {NavigationUtils} from '../utils/NavigationUtils';

const Welcome = () => {
  const next = async () => {
    setIsLoading(true);
    const content = await _taskService.loadContent();
    setIsLoading(false);

    if (content != null) {
      NavigationUtils.navigate('SelectServices' as never);
    } else {
      Alert.alert(
        'Keine Internetverbindung',
        'Stelle sicher, dass du eine aktive Internetverbindung hast und versuche es erneut.',
      );
    }
  };

  const openTos = () => {
    LinkingUtils.openURL(Config.tosUrl);
  };

  const [isLoading, setIsLoading] = useState(false);

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
        <BouncyImage
          entering={FadeInDown.duration(1000)}
          source={require('./../assets/Text_White.png')}
          resizeMode="contain"
          width={300}
          height={150}
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
          <TypeWriter
            typing={1}
            fixed
            minDelay={40}
            maxDelay={40}
            style={{color: 'white', fontWeight: '600', fontSize: 16}}>
            Die App für mehr Sicherheit{'\n'}und Privatsphäre im Internet.
          </TypeWriter>
          <Animated.View entering={FadeInDown.duration(1000).delay(3500)}>
            <Text style={{color: 'white', marginTop: 20}}>
              Mit der Safe im Netz-App kannst du ganz einfach und spielerisch deine Cyber-Sicherheit verbessern.{'\n\n'}
              Wähle dazu im nächsten Schritt alle Dienste aus, die du verwendest. Die App erstellt dir dann eine
              Checkliste an Aufgaben, auch Tasks genannt, welche du erledigen (aber auch ignorieren) kannst, um besser
              gegen die Gefahren im Internet gewappnet zu sein.
            </Text>
          </Animated.View>
        </Animated.View>
        <Animated.View entering={FadeInDown.duration(1000).delay(4000)}>
          <Button
            style={{marginTop: 80}}
            onPress={() => next()}
            title="Los geht's"
            isLoading={isLoading}
            theme="light"
          />
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
