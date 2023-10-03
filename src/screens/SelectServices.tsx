import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import ListView from '../components/ListView';
import {Colors} from '../models/Colors';
import {_taskService} from '../services/TaskService';
import {NavigationUtils} from '../utils/NavigationUtils';

const SelectServices = () => {
  const categories = _taskService.content.value?.categories!;

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    getCurrentCategoryIds();
  }, []);

  const getCurrentCategoryIds = async () => {
    const currentCategories = await _taskService.getSelectedCategoryIds();
    setSelectedCategories(currentCategories);
  };

  const toggleCategory = (id: number) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(cats => cats.filter(catId => catId !== id));
    } else {
      setSelectedCategories(cats => cats.concat(id));
    }
  };

  const saveAndContinue = async () => {
    await _taskService.saveSelectedCategoryIds(selectedCategories);
    NavigationUtils.navigateWithoutBack('Home' as never);
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#F3F2F7'}} contentContainerStyle={{paddingTop: 20}}>
      <View style={{paddingHorizontal: 25}}>
        <Text style={{color: 'gray'}}>Wähle nun alle Dienste aus, die du verwendest.</Text>
      </View>
      <ListView style={{marginTop: 20}}>
        {categories.map(c => {
          const isSelected = selectedCategories.includes(c.id);

          return (
            <TouchableOpacity
              key={c.id}
              onPress={() => toggleCategory(c.id)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 12,
              }}>
              <View style={{width: '90%'}}>
                <Text style={{fontSize: 16}}>{c.title}</Text>
                {c.subtitle && <Text style={{color: 'gray'}}>{c.subtitle}</Text>}
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
                  backgroundColor: isSelected ? Colors.primary : '#fff',
                }}>
                <Icon color="#fff" size={18} name="checkmark-outline" />
              </View>
            </TouchableOpacity>
          );
        })}
      </ListView>
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <Button
          disabled={selectedCategories.length === 0}
          onPress={() => saveAndContinue()}
          title="Weiter"
          theme="primary"
        />
      </View>
    </ScrollView>
  );
};

export default SelectServices;
