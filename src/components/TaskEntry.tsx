import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSubscribe} from '../hooks/useSubscribe';
import {Task} from '../models/Task';
import {_taskService} from '../services/TaskService';
import {NavigationUtils} from '../utils/NavigationUtils';
import CategoryTag from './CategoryTag';
import RoundCheckmark from './RoundCheckmark';

const TaskEntry = (props: {task: Task}) => {
  const content = useSubscribe(_taskService.content);
  const readTaskIds = useSubscribe(_taskService.readTaskIds);

  const {task} = props;

  const isDone = readTaskIds?.includes(task.id ?? 0);

  return (
    <TouchableOpacity
      onPress={() => NavigationUtils.navigate('TaskDetail', {taskId: task.id})}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
      }}>
      <View style={{width: '90%'}}>
        <Text style={{fontSize: 17}}>{task.title}</Text>
        <Text style={{color: 'gray', marginTop: 5}}>{task.desc}</Text>
        <CategoryTag text={content?.categories.find(c => c.id === task.categoryId)!.title} />
      </View>
      <RoundCheckmark isDone={isDone} />
    </TouchableOpacity>
  );
};

export default TaskEntry;
