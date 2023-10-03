import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
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
      contentContainerStyle={{paddingTop: 20}}>
      <TouchableOpacity style={{paddingHorizontal: 25}}>
        <Text style={{color: 'gray'}}>Erledigte Tasks anzeigen... (0)</Text>
      </TouchableOpacity>
      <ListView style={{marginVertical: 20}}>
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
      <TouchableOpacity style={{paddingHorizontal: 25, paddingBottom: 50}}>
        <Text style={{color: 'gray'}}>Ignorierte Tasks anzeigen... (0)</Text>
      </TouchableOpacity>
    </ScrollViewBackSwipe>
  );
};

export default Home;
