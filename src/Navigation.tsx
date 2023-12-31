import {NavigationContainer} from '@react-navigation/native';
import {StackNavigationOptions, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {CopilotStep} from 'react-native-copilot';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCopilotView from './components/copilot/CustomCopilotView';
import {Colors} from './models/Colors';
import Home from './screens/Home';
import OpenSourceLicenses from './screens/OpenSourceLicenses';
import ReadTasks from './screens/ReadTasks';
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
        <CopilotStep
          order={3}
          name="settings"
          text="In den Einstellungen kannst du Dienste hinzufügen und entfernen. Außerdem kannst du mehr über die Safe im Netz App erfahren.">
          <CustomCopilotView>
            <Icon size={28} name="cog-outline" color={Colors.primary} />
          </CustomCopilotView>
        </CopilotStep>
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
        <Stack.Screen name="TaskDetail" component={TaskDetail} options={{title: 'Task ansehen'}} />
        <Stack.Screen name="Settings" component={Settings} options={{title: 'Einstellungen'}} />
        <Stack.Screen
          name="OpenSourceLicenses"
          component={OpenSourceLicenses}
          options={{title: 'Open-Source Lizenzen'}}
        />
        <Stack.Screen name="ReadTasks" component={ReadTasks} options={{title: 'Erledigte Tasks'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
