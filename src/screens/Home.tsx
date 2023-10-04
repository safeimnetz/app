import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CircleProgressBar from '../components/CircleProgressBar';
import ListView from '../components/ListView';
import ScrollViewBackSwipe from '../components/ScrollViewBackSwipe';
import {Colors} from '../models/Colors';
import {_taskService} from '../services/TaskService';

const Home = () => {
  const categories = _taskService.content.value?.categories!;
  const tasks = _taskService.content.value?.tasks!;

  // const [tasks, setTasks] = useState<Task[]>([]);

  // useEffect(() => {
  //   setMyTasks();
  // }, []);

  // const setMyTasks = async () => {
  //   setTasks(_taskService.content.value?.tasks!);
  // };

  return (
    <ScrollViewBackSwipe
      style={{flex: 1, backgroundColor: Colors.scrollViewBackground}}
      contentContainerStyle={{paddingTop: 10}}>
      <Text style={{paddingTop: 10, paddingHorizontal: 30, color: 'gray', textTransform: 'uppercase'}}>
        Mein Security-Score
      </Text>
      <ListView style={{marginVertical: 10}}>
        <View style={{paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}}>
          <CircleProgressBar percentage={65} />
        </View>
      </ListView>
      <Text style={{paddingTop: 10, paddingHorizontal: 30, color: 'gray', textTransform: 'uppercase'}}>
        Meine Tasks
      </Text>
      <ListView style={{marginVertical: 10}}>
        {tasks.map(t => {
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
                    {categories.find(c => c.id === t.categoryId)!.title}
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
            <Text style={{fontSize: 16}}>Erledigte Tasks anzeigen... (0)</Text>
          </View>
          <Icon color={Colors.primary} size={18} name="chevron-forward-outline" />
        </TouchableOpacity>
      </ListView>
    </ScrollViewBackSwipe>
  );
};

export default Home;
