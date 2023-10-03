import {NavigationContainer} from '@react-navigation/native';
import {StackNavigationOptions, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
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
  headerTitle: () => {
    return (
      <View pointerEvents="none">
        <Image source={require('./assets/Text_Gradient.png')} resizeMode="contain" style={{width: 150}} />
      </View>
    );
  },
  headerRight: () => {
    return (
      <TouchableOpacity style={{paddingRight: 20}} onPress={() => NavigationUtils.navigate('Settings')}>
        <Icon size={28} name="cog-outline" color={Colors.primary} />
      </TouchableOpacity>
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
