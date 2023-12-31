import React from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Config} from '../Config';
import ListView from '../components/ListView';
import ScrollViewBackSwipe from '../components/ScrollViewBackSwipe';
import {Colors} from '../models/Colors';
import {_taskService} from '../services/TaskService';
import {LinkingUtils} from '../utils/LinkingUtils';
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
    <ScrollViewBackSwipe
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
          title: 'Tutorial neu starten',
          onPress: () => {
            Alert.alert(
              'Tutorial neu starten?',
              'Dadurch wird die App zurückgesetzt und es gehen die ausgewählten Dienste und erledigten Tasks verloren.',
              [
                {
                  text: 'App zurücksetzen',
                  style: 'destructive',
                  onPress: async () => {
                    await _taskService.resetApp();
                    NavigationUtils.navigateWithoutBack('Welcome');
                  },
                },
                {text: 'Abbrechen', style: 'cancel'},
              ],
            );
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
            LinkingUtils.openURL(Config.tosUrl);
          },
        })}
        {renderSettingsEntry({
          title: 'Über Safe im Netz',
          onPress: () => {
            LinkingUtils.openURL(Config.websiteUrl);
          },
        })}
      </ListView>

      <View style={{paddingHorizontal: 30, paddingTop: 30}}>
        <TouchableOpacity onPress={() => LinkingUtils.openURL(Config.gitHubLink)}>
          <Text style={{color: 'gray'}}>
            Wir ❤️ Open-Source. Deshalb ist 100% unserer Codebase öffentlich auf{' '}
            <Text style={{textDecorationLine: 'underline'}}>GitHub</Text> einsehbar.
          </Text>
        </TouchableOpacity>

        <Text style={{color: 'gray', marginTop: 40}}>Eine Initiative der</Text>
        <TouchableOpacity onPress={() => LinkingUtils.openURL(Config.htlWebsiteUrl)}>
          <Image source={require('./../assets/Logo_HTL.png')} style={{width: 150, height: 50}} resizeMode="contain" />
        </TouchableOpacity>

        <Text style={{color: 'gray', marginTop: 30}}>Umsetzung und Wartung</Text>
        <TouchableOpacity onPress={() => LinkingUtils.openURL(Config.kropfItWebsiteUrl)}>
          <Image
            source={require('./../assets/Logo_Kropf_IT.png')}
            style={{width: 90, height: 55}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </ScrollViewBackSwipe>
  );
};

export default Settings;
