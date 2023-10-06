import React from 'react';
import {Text, View} from 'react-native';
import ListView from '../components/ListView';
import ScrollViewBackSwipe from '../components/ScrollViewBackSwipe';
import TaskEntry from '../components/TaskEntry';
import {useSubscribe} from '../hooks/useSubscribe';
import {Colors} from '../models/Colors';
import {_taskService} from '../services/TaskService';

const ReadTasks = () => {
  const content = useSubscribe(_taskService.content);
  const readTaskIds = useSubscribe(_taskService.readTaskIds);

  const readTasks = content?.tasks?.filter(t => readTaskIds?.includes(t.id));

  return (
    <ScrollViewBackSwipe
      style={{flex: 1, backgroundColor: Colors.scrollViewBackground}}
      contentContainerStyle={{paddingTop: 10}}>
      {readTasks != null && readTasks.length > 0 && (
        <ListView style={{marginVertical: 10, paddingBottom: 50}}>
          {readTasks?.map(t => {
            return <TaskEntry key={t.id} task={t} />;
          })}
        </ListView>
      )}

      {(readTasks == null || readTaskIds?.length === 0) && (
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
      )}
    </ScrollViewBackSwipe>
  );
};

export default ReadTasks;
