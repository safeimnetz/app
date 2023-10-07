import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Button from '../components/Button';
import CategoryTag from '../components/CategoryTag';
import ListView from '../components/ListView';
import RoundCheckmark from '../components/RoundCheckmark';
import ScrollViewBackSwipe from '../components/ScrollViewBackSwipe';
import {useSubscribe} from '../hooks/useSubscribe';
import {Colors} from '../models/Colors';
import {Task} from '../models/Task';
import {_taskService} from '../services/TaskService';

const TaskDetail = ({route}: {route: any}) => {
  const content = useSubscribe(_taskService.content);
  const readTaskIds = useSubscribe(_taskService.readTaskIds);

  const [task, setTask] = useState<Task | undefined>();

  const isDone = readTaskIds?.includes(task?.id ?? 0);

  const nav = useNavigation();

  useEffect(() => {
    if (route.params?.taskId != null) {
      const taskId = route.params?.taskId;
      const foundTask = _taskService.content.value!.tasks.find(t => t.id === taskId);
      if (foundTask != null) {
        setTask(foundTask);
      }
    }
  }, [route.params]);

  useEffect(() => {
    nav.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => {
        return (
          <TouchableOpacity style={{marginRight: 20}} onPress={() => toggleReadStatus()}>
            <RoundCheckmark isDone={isDone} />
          </TouchableOpacity>
        );
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nav, isDone, task]);

  const toggleReadStatus = async () => {
    await _taskService.toggleReadTask(task?.id!);
  };

  return (
    <ScrollViewBackSwipe
      style={{flex: 1, backgroundColor: Colors.scrollViewBackground}}
      contentContainerStyle={{paddingTop: 10}}>
      {task != null && (
        <ListView style={{marginVertical: 10}}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>{task?.title}</Text>
            <CategoryTag text={content?.categories.find(c => c.id === task?.categoryId)!.title} />
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}></View>
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <Button
              title={isDone ? 'Als ungelesen markieren' : 'Als gelesen markieren'}
              theme="primary"
              onPress={() => toggleReadStatus()}
              style={{height: 50}}
            />
          </View>
        </ListView>
      )}
    </ScrollViewBackSwipe>
  );
};

export default TaskDetail;
