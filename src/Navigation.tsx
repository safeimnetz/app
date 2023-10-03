import {NavigationContainer} from '@react-navigation/native';
import {StackNavigationOptions, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image, View} from 'react-native';
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

const mainHeaderOptions: StackNavigationOptions = {
  headerBackTitle: '\n',
  headerTintColor: Colors.primary,
  headerTitle: () => {
    return (
      <View pointerEvents="none">
        <Image source={require('./assets/Text_Gradient.png')} resizeMode="contain" style={{width: 150}} />
      </View>
    );
  },
};

const defaultHeaderOptions: StackNavigationOptions = {
  headerBackTitle: '\n',
  headerTintColor: Colors.primary,
};

const Navigation = (props: {initialRouteName?: string}) => {
  return (
    <NavigationContainer ref={NavigationUtils.navigationRef}>
      <Stack.Navigator initialRouteName={props.initialRouteName}>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
        <Stack.Screen
          name="SelectServices"
          component={SelectServices}
          options={{...defaultHeaderOptions, title: 'Dienste auswählen'}}
        />
        <Stack.Screen name="Home" component={Home} options={{...mainHeaderOptions}} />
        <Stack.Screen name="TaskDetail" component={TaskDetail} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="OpenSourceLicenses" component={OpenSourceLicenses} />
        <Stack.Screen name="FilteredTaskList" component={FilteredTaskList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
