import React, {useEffect, useState} from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ListView from '../components/ListView';
import ScrollViewBackSwipe from '../components/ScrollViewBackSwipe';
import {Colors} from '../models/Colors';

interface License {
  name: string;
  version: string;
  licenseUrl: string;
}

const OpenSourceLicenses = () => {
  const [licenses, setLicenses] = useState<License[]>([]);

  useEffect(() => {
    getLicensesFromJson();
  }, []);

  const getLicensesFromJson = () => {
    const jsonLicenses = require('./../../licenses.json');
    const numberRegex = /\d+(\.\d+)*/;
    const atRegex = /(?:@)/gi;

    const finalLicenses: License[] = [];

    for (const key of Object.keys(jsonLicenses)) {
      const version = key.match(numberRegex);
      const nameWithoutVersion = key.replace(atRegex, '').replace(version ? version[0] : '', '');
      const url = jsonLicenses[key].licenseUrl;

      finalLicenses.push({name: nameWithoutVersion, version: version ? version[0] : '', licenseUrl: url});
    }

    setLicenses(finalLicenses);
  };

  return (
    <ScrollViewBackSwipe
      style={{flex: 1, backgroundColor: Colors.scrollViewBackground}}
      contentContainerStyle={{paddingTop: 20, paddingBottom: 50}}>
      <View style={{paddingHorizontal: 25}}>
        <Text style={{color: 'gray'}}>Danke für die folgenden coolen 😎 Libraries:</Text>
      </View>
      <ListView style={{marginTop: 20}}>
        {licenses.map(l => {
          return (
            <TouchableOpacity
              key={l.name}
              onPress={() => Linking.openURL(l.licenseUrl)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 12,
              }}>
              <View style={{width: '90%'}}>
                <Text style={{fontSize: 16}}>{l.name}</Text>
                <Text style={{color: 'gray', marginTop: 2}}>{l.version}</Text>
              </View>
              <Icon color={Colors.primary} size={18} name="chevron-forward-outline" />
            </TouchableOpacity>
          );
        })}
      </ListView>
    </ScrollViewBackSwipe>
  );
};

export default OpenSourceLicenses;
