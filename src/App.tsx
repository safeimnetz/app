import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import {CopilotProvider} from 'react-native-copilot';
import Navigation from './Navigation';
import CustomStepNumberComponent from './components/copilot/CustomStepNumberComponent';
import CustomTooltipComponent from './components/copilot/CustomTooltipComponent';
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
        return;
      } else {
        await _taskService.getSelectedCategoryIds();
        await _taskService.getReadTaskIds();
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

  return (
    <CopilotProvider stepNumberComponent={CustomStepNumberComponent} tooltipComponent={CustomTooltipComponent}>
      <Navigation initialRouteName={setupDone ? 'Home' : 'Welcome'} />
    </CopilotProvider>
  );
};

export default App;
