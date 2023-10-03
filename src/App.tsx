import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import Navigation from './Navigation';
import {Colors} from './models/Colors';
import {_taskService} from './services/TaskService';

const App = () => {
  const [setupDone, setSetupDone] = useState<boolean | undefined>();

  useEffect(() => {
    checkSetupState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkSetupState = async () => {
    const setupState = await _taskService.getSetupDone();

    // Load content on app start when setup is done
    if (setupState) {
      const content = await _taskService.loadContent();
      if (content == null) {
        Alert.alert(
          'Keine Internetverbindung',
          'Stelle sicher, dass du eine aktive Internetverbindung hast und versuche es erneut.',
          [{text: 'Erneut versuchen', onPress: () => checkSetupState()}],
        );
      }
    }

    setSetupDone(setupState);
  };

  if (setupDone == null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  return <Navigation initialRouteName={setupDone ? 'Home' : 'Welcome'} />;
};

export default App;
