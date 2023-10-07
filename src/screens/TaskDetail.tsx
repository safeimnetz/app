import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Alert, Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import RenderHtml from 'react-native-render-html';
import Button from '../components/Button';
import CategoryTag from '../components/CategoryTag';
import ListView from '../components/ListView';
import RoundCheckmark from '../components/RoundCheckmark';
import ScrollViewBackSwipe from '../components/ScrollViewBackSwipe';
import {useSubscribe} from '../hooks/useSubscribe';
import {Colors} from '../models/Colors';
import {Task} from '../models/Task';
import {_taskService} from '../services/TaskService';
import {NavigationUtils} from '../utils/NavigationUtils';

const TaskDetail = ({route}: {route: any}) => {
  const content = useSubscribe(_taskService.content);
  const readTaskIds = useSubscribe(_taskService.readTaskIds);

  const [task, setTask] = useState<Task | undefined>();
  const [infoContent, setInfoContent] = useState<string | undefined>();
  const [tutorialContent, setTutorialContent] = useState<string | undefined>();

  const isDone = readTaskIds?.includes(task?.id ?? 0);

  const nav = useNavigation();

  const {width} = useWindowDimensions();

  const confettiRef = useRef<any | null>();

  useEffect(() => {
    if (route.params?.taskId != null) {
      const taskId = route.params?.taskId;
      const foundTask = _taskService.content.value!.tasks.find(t => t.id === taskId);
      if (foundTask != null) {
        setTask(foundTask);
        loadContent(foundTask);
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

  const loadContent = async (newTask: Task) => {
    const info = await _taskService.loadHtml(newTask.infoContentUrl);
    const tutorial = await _taskService.loadHtml(newTask.tutorialContentUrl);

    if (info != null && tutorial != null) {
      setInfoContent(info);
      setTutorialContent(tutorial);
    } else {
      Alert.alert(
        'Keine Internetverbindung',
        'Um einen Task anzuzeigen wird eine aktive Internetverbindung benötigt. Stelle sicher, dass du online bist und versuche es erneut.',
      );
      NavigationUtils.goBack();
    }
  };

  const toggleReadStatus = async () => {
    if (!isDone) {
      confettiRef.current?.start();
    }

    await _taskService.toggleReadTask(task?.id!);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollViewBackSwipe
        style={{flex: 1, backgroundColor: Colors.scrollViewBackground}}
        contentContainerStyle={{paddingTop: 10}}>
        {task != null && infoContent != null && tutorialContent != null && (
          <ListView style={{marginVertical: 10, paddingBottom: 40}}>
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
            <View style={{paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20}}>
              <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 10}}>Information</Text>
              <RenderHtml contentWidth={width} source={{html: infoContent}} />
            </View>
            <View style={{paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20}}>
              <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 10}}>Tutorial </Text>
              <RenderHtml contentWidth={width} source={{html: tutorialContent}} />
            </View>
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
        {(task == null || infoContent == null || tutorialContent == null) && (
          <View style={{alignItems: 'center', paddingTop: 50}}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        )}
      </ScrollViewBackSwipe>
      <View pointerEvents="none" style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0}}>
        <ConfettiCannon ref={confettiRef} count={200} origin={{x: -20, y: 0}} autoStart={false} fadeOut />
      </View>
    </View>
  );
};

export default TaskDetail;
