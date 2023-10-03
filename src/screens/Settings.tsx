import React from 'react';
import {Image, Linking, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Config} from '../Config';
import ListView from '../components/ListView';
import {Colors} from '../models/Colors';
import {NavigationUtils} from '../utils/NavigationUtils';

const Settings = () => {
  const renderSettingsEntry = (props: {onPress: () => void; title: string}) => {
    return (
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 12,
        }}>
        <View style={{width: '90%'}}>
          <Text style={{fontSize: 16}}>{props.title}</Text>
        </View>
        <Icon color={Colors.primary} size={18} name="chevron-forward-outline" />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: Colors.scrollViewBackground}}
      contentContainerStyle={{paddingTop: 20}}>
      <View style={{alignItems: 'center', paddingVertical: 10}}>
        <Image
          source={require('./../assets/Text_Gradient.png')}
          resizeMode="contain"
          style={{width: 250, height: 100}}
        />
      </View>

      <ListView style={{marginTop: 20}}>
        {renderSettingsEntry({
          title: 'Dienste hinzufügen/ändern',
          onPress: () => {
            NavigationUtils.navigate('SelectServices');
          },
        })}
        {renderSettingsEntry({
          title: 'Über Safe im Netz',
          onPress: () => {
            Linking.openURL(Config.websiteUrl);
          },
        })}
        {renderSettingsEntry({
          title: 'Open-Source Lizenzen',
          onPress: () => {
            NavigationUtils.navigate('OpenSourceLicenses');
          },
        })}
        {renderSettingsEntry({
          title: 'Nutzungsbedingungen',
          onPress: () => {
            Linking.openURL(Config.tosUrl);
          },
        })}
      </ListView>

      <View style={{paddingHorizontal: 30, paddingTop: 50}}>
        <TouchableOpacity onPress={() => Linking.openURL(Config.gitHubLink)}>
          <Text style={{color: 'gray'}}>
            Wir ❤️ Open-Source. Deshalb ist 100% unserer Codebase öffentlich auf{' '}
            <Text style={{textDecorationLine: 'underline'}}>GitHub</Text> einsehbar.
          </Text>
        </TouchableOpacity>

        <Text style={{color: 'gray', marginTop: 30}}>Eine Initiative der</Text>
        <TouchableOpacity onPress={() => Linking.openURL(Config.htlWebsiteUrl)}>
          <Image source={require('./../assets/Logo_HTL.png')} style={{width: 150, height: 50}} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Settings;
