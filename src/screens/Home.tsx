import React, {useEffect, useRef} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {CopilotStep, useCopilot} from 'react-native-copilot';
import {Ionicons as Icon} from '@expo/vector-icons';
import CircleProgressBar from '../components/CircleProgressBar';
import ListView from '../components/ListView';
import ScrollViewBackSwipe from '../components/ScrollViewBackSwipe';
import TaskEntry from '../components/TaskEntry';
import CustomCopilotView from '../components/copilot/CustomCopilotView';
import {useSubscribe} from '../hooks/useSubscribe';
import {Colors} from '../models/Colors';
import {_taskService} from '../services/TaskService';
import {NavigationUtils} from '../utils/NavigationUtils';

const Home = () => {
  const content = useSubscribe(_taskService.content);
  const selectedCategories = useSubscribe(_taskService.selectedCategories);
  const readTaskIds = useSubscribe(_taskService.readTaskIds);

  const myTasks = content?.tasks.filter(t => selectedCategories?.includes(t.categoryId));
  const myUnreadTasks = myTasks?.filter(t => !readTaskIds?.includes(t.id));
  const readTasks = content?.tasks?.filter(t => readTaskIds?.includes(t.id));

  const securityScore = (((myTasks?.length ?? 1) - (myUnreadTasks?.length ?? 0)) / (myTasks?.length ?? 1)) * 100;

  const copilot = useCopilot();
  const tutorialScrollViewRef = useRef<ScrollView>(null);
  const tutorialStartScheduled = useRef(false);

  useEffect(() => {
    const listener = async () => {
      await _taskService.saveInlineTutorialDone(true);
    };

    copilot.copilotEvents.on('stop', listener);

    return () => {
      copilot.copilotEvents.off('stop', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isMounted = true;

    const startTutorial = async () => {
      if (copilot.totalStepsNumber === 0) {
        return;
      }

      const isDone = await _taskService.getInlineTutorialDone();
      if (isDone || tutorialStartScheduled.current || !isMounted) {
        return;
      }

      tutorialStartScheduled.current = true;
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (isMounted) {
            void copilot.start(undefined, tutorialScrollViewRef.current);
          }
        }, 500);
      });
    };

    void startTutorial();

    return () => {
      isMounted = false;
    };
  }, [copilot.start, copilot.totalStepsNumber]);

  return (
    <ScrollViewBackSwipe
      ref={tutorialScrollViewRef}
      style={{flex: 1, backgroundColor: Colors.scrollViewBackground}}
      contentContainerStyle={{paddingTop: 10}}>
      <Text style={{paddingTop: 10, paddingHorizontal: 30, color: 'gray', textTransform: 'uppercase'}}>
        Mein Security-Score
      </Text>
      <CopilotStep
        order={2}
        name="score"
        text="Immer wenn du Tasks abschließt geht dein Security-Score nach oben. Dein Ziel soll es also sein, einen möglichst hohen Score zu erreichen.">
        <CustomCopilotView>
          <ListView style={{marginVertical: 10}}>
            <View style={{paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}}>
              <CircleProgressBar percentage={securityScore} />
            </View>
          </ListView>
        </CustomCopilotView>
      </CopilotStep>
      <Text style={{paddingTop: 10, paddingHorizontal: 30, color: 'gray', textTransform: 'uppercase'}}>
        Meine Tasks
      </Text>
      <CopilotStep
        order={1}
        name="tasks"
        text="Willkommen! Hier findest du all deine Tasks, die du erledigen kannst, um vor Gefahren im Internet besser geschützt zu sein. Du kannst auf einen Task klicken, um ihn anzusehen und abzuschließen.">
        <CustomCopilotView>
          <View>
            {myUnreadTasks != null && myUnreadTasks.length > 0 && (
              <ListView style={{marginVertical: 10}}>
                {myUnreadTasks?.map(t => {
                  return <TaskEntry key={t.id} task={t} />;
                })}
              </ListView>
            )}

            {(myUnreadTasks == null || myUnreadTasks?.length === 0) && (
              <ListView style={{marginVertical: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                  }}>
                  <View style={{width: '90%'}}>
                    <Text style={{fontSize: 16, color: 'gray'}}>Alles erledigt!</Text>
                  </View>
                </View>
              </ListView>
            )}
          </View>
        </CustomCopilotView>
      </CopilotStep>
      <Text style={{paddingTop: 10, paddingHorizontal: 30, color: 'gray', textTransform: 'uppercase'}}>Mehr</Text>
      <ListView style={{marginVertical: 10, paddingBottom: 50}}>
        <TouchableOpacity
          onPress={() => NavigationUtils.navigate('ReadTasks')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 12,
          }}>
          <View style={{width: '90%'}}>
            <Text style={{fontSize: 16}}>Erledigte Tasks anzeigen... ({readTasks?.length})</Text>
          </View>
          <Icon color={Colors.primary} size={18} name="chevron-forward-outline" />
        </TouchableOpacity>
      </ListView>
    </ScrollViewBackSwipe>
  );
};

export default Home;
