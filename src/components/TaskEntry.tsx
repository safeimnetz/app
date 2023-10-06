import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSubscribe} from '../hooks/useSubscribe';
import {Colors} from '../models/Colors';
import {Task} from '../models/Task';
import {_taskService} from '../services/TaskService';
import {NavigationUtils} from '../utils/NavigationUtils';

const TaskEntry = (props: {task: Task; isDone?: boolean}) => {
  const content = useSubscribe(_taskService.content);
  const {task, isDone} = props;

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
            {content?.categories.find(c => c.id === task.categoryId)!.title}
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
          backgroundColor: isDone ? Colors.primary : '#fff',
        }}>
        <Icon color="#fff" size={18} name="checkmark-outline" />
      </View>
    </TouchableOpacity>
  );
};

export default TaskEntry;
