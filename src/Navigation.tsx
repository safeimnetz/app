import {NavigationContainer} from '@react-navigation/native';
import {StackNavigationOptions, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image, View} from 'react-native';
import LogoGradient from './components/LogoGradient';
import {Colors} from './models/Colors';
import FilteredTaskList from './screens/FilteredTaskList';
import Home from './screens/Home';
import OpenSourceLicenses from './screens/OpenSourceLicenses';
import SelectServices from './screens/SelectServices';
import Settings from './screens/Settings';
import TaskDetail from './screens/TaskDetail';
import Welcome from './screens/Welcome';

const Stack = createStackNavigator();

const mainHeaderOptions: StackNavigationOptions = {
  headerBackground: () => {
    return <LogoGradient />;
  },
  headerTitle: () => {
    return (
      <View>
        <Image source={require('./assets/Text_White.png')} resizeMode="contain" style={{width: 150}} />
      </View>
    );
  },
};

const defaultHeaderOptions: StackNavigationOptions = {
  headerBackTitle: '\n',
  headerTintColor: Colors.primary,
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
        <Stack.Screen
          name="SelectServices"
          component={SelectServices}
          options={{...defaultHeaderOptions, title: 'Dienste auswählen'}}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TaskDetail" component={TaskDetail} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="OpenSourceLicenses" component={OpenSourceLicenses} />
        <Stack.Screen name="FilteredTaskList" component={FilteredTaskList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
