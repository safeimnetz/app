import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {CopilotStep, useCopilot} from 'react-native-copilot';
import Icon from 'react-native-vector-icons/Ionicons';
import CircleProgressBar from '../components/CircleProgressBar';
import ListView from '../components/ListView';
import ScrollViewBackSwipe from '../components/ScrollViewBackSwipe';
import CustomCopilotView from '../components/copilot/CustomCopilotView';
import {useSubscribe} from '../hooks/useSubscribe';
import {Colors} from '../models/Colors';
import {_taskService} from '../services/TaskService';

const Home = () => {
  const content = useSubscribe(_taskService.content);
  const selectedCategories = useSubscribe(_taskService.selectedCategories);
  const readTaskIds = useSubscribe(_taskService.readTaskIds);

  const myTasks = content?.tasks.filter(t => selectedCategories?.includes(t.id));
  const myUnreadTasks = myTasks?.filter(t => !readTaskIds?.includes(t.id));
  const myReadTasks = myTasks?.filter(t => readTaskIds?.includes(t.id));

  const securityScore = ((myReadTasks?.length ?? 0) / (myTasks?.length ?? 1)) * 100;

  const copilot = useCopilot();

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

  return (
    <ScrollViewBackSwipe
      onLayout={async () => {
        const isDone = await _taskService.getInlineTutorialDone();
        if (!isDone) {
          setTimeout(() => {
            copilot.start();
          }, 500);
        }
      }}
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
          <ListView style={{marginVertical: 10}}>
            {myUnreadTasks?.map(t => {
              return (
                <TouchableOpacity
                  key={t.id}
                  onPress={() => {}}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                  }}>
                  <View style={{width: '90%'}}>
                    <Text style={{fontSize: 17}}>{t.title}</Text>
                    <Text style={{color: 'gray', marginTop: 5}}>{t.desc}</Text>
                    <View
                      style={{
                        marginTop: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        backgroundColor: Colors.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                        borderRadius: 7,
                      }}>
                      <Text style={{color: '#fff', fontWeight: '600'}}>
                        {content?.categories.find(c => c.id === t.categoryId)!.title}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                      borderWidth: 1.5,
                      borderColor: Colors.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <Icon color="#fff" size={18} name="checkmark-outline" /> */}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ListView>
        </CustomCopilotView>
      </CopilotStep>
      <Text style={{paddingTop: 10, paddingHorizontal: 30, color: 'gray', textTransform: 'uppercase'}}>Mehr</Text>
      <ListView style={{marginVertical: 10, paddingBottom: 50}}>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 12,
          }}>
          <View style={{width: '90%'}}>
            <Text style={{fontSize: 16}}>Erledigte Tasks anzeigen... ({myReadTasks?.length})</Text>
          </View>
          <Icon color={Colors.primary} size={18} name="chevron-forward-outline" />
        </TouchableOpacity>
      </ListView>
    </ScrollViewBackSwipe>
  );
};

export default Home;
