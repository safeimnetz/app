import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import ListView from '../components/ListView';
import ScrollViewBackSwipe from '../components/ScrollViewBackSwipe';
import {Colors} from '../models/Colors';
import {Task} from '../models/Task';
import {_taskService} from '../services/TaskService';

const TaskDetail = ({route}: {route: any}) => {
  const [task, setTask] = useState<Task | undefined>();

  const nav = useNavigation();

  useEffect(() => {
    if (route.params?.taskId != null) {
      const taskId = route.params?.taskId;
      const foundTask = _taskService.content.value!.tasks.find(t => t.id === taskId);
      if (foundTask != null) {
        setTask(foundTask);
        nav.setOptions({title: foundTask.title});
      }
    }
  }, [nav, route.params]);

  return (
    <ScrollViewBackSwipe
      style={{flex: 1, backgroundColor: Colors.scrollViewBackground}}
      contentContainerStyle={{paddingTop: 10}}>
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
            <Text style={{fontSize: 16, color: 'gray'}}>Keine erledigten Tasks</Text>
          </View>
        </View>
      </ListView>
    </ScrollViewBackSwipe>
  );
};

export default TaskDetail;
