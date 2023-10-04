import {NavigationContainer} from '@react-navigation/native';
import {StackNavigationOptions, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from './models/Colors';
import FilteredTaskList from './screens/FilteredTaskList';
import Home from './screens/Home';
import OpenSourceLicenses from './screens/OpenSourceLicenses';
import SelectServices from './screens/SelectServices';
import Settings from './screens/Settings';
import TaskDetail from './screens/TaskDetail';
import Welcome from './screens/Welcome';
import {NavigationUtils} from './utils/NavigationUtils';

const Stack = createStackNavigator();

const defaultHeaderOptions: StackNavigationOptions = {
  headerBackTitle: '\n',
  headerTintColor: Colors.primary,
};

const mainHeaderOptions: StackNavigationOptions = {
  ...defaultHeaderOptions,
  header: () => {
    return (
      <SafeAreaView style={{backgroundColor: '#fff'}}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            borderColor: '#EBEAEC',
            borderBottomWidth: 1,
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}>
          <View pointerEvents="none">
            <Image
              source={require('./assets/Text_Gradient.png')}
              resizeMode="contain"
              style={{width: 150, height: 45}}
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                color: Colors.primary,
                textAlign: 'center',
                paddingTop: 5,
                paddingBottom: 15,
              }}>
              Meine Tasks
            </Text>
          </View>
          <TouchableOpacity
            style={{position: 'absolute', right: 20, height: '100%', justifyContent: 'center'}}
            onPress={() => NavigationUtils.navigate('Settings')}>
            <Icon size={28} name="cog-outline" color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  },
};

const Navigation = (props: {initialRouteName?: string}) => {
  return (
    <NavigationContainer ref={NavigationUtils.navigationRef}>
      <Stack.Navigator initialRouteName={props.initialRouteName} screenOptions={{...defaultHeaderOptions}}>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
        <Stack.Screen name="SelectServices" component={SelectServices} options={{title: 'Dienste auswählen'}} />
        <Stack.Screen name="Home" component={Home} options={{...mainHeaderOptions}} />
        <Stack.Screen name="TaskDetail" component={TaskDetail} />
        <Stack.Screen name="Settings" component={Settings} options={{title: 'Einstellungen'}} />
        <Stack.Screen
          name="OpenSourceLicenses"
          component={OpenSourceLicenses}
          options={{title: 'Open-Source Lizenzen'}}
        />
        <Stack.Screen name="FilteredTaskList" component={FilteredTaskList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
