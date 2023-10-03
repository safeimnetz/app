import AsyncStorage from '@react-native-async-storage/async-storage';
import {BehaviorSubject} from 'rxjs';
import {Config} from '../Config';
import {Content} from '../models/Content';

const AsyncStorageKeys = {
  categoryIds: 'categoryIds',
};

class TaskService {
  public content = new BehaviorSubject<Content | null>(null);

  public async loadContent() {
    try {
      const res = await fetch(Config.baseUrl + '/content.json');
      if (res.status !== 200) {
        throw new Error('Status was not 200');
      }

      const json = await res.json();
      const content = json as Content;

      this.content.next(content);

      return content;
    } catch (e: any) {
      console.log('Fetch failed with error: ' + e);
      return null;
    }
  }

  public async getSelectedCategoryIds() {
    const idsJson = await AsyncStorage.getItem(AsyncStorageKeys.categoryIds);
    if (idsJson == null) {
      return [];
    }
    return JSON.parse(idsJson) as number[];
  }

  public async saveSelectedCategoryIds(ids: number[]) {
    await AsyncStorage.setItem(AsyncStorageKeys.categoryIds, JSON.stringify(ids));
  }
}

export const _taskService = new TaskService();
