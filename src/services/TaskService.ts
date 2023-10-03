import AsyncStorage from '@react-native-async-storage/async-storage';
import {BehaviorSubject} from 'rxjs';
import {Config} from '../Config';
import {Content} from '../models/Content';

const AsyncStorageKeys = {
  setupDone: 'setupDone',
  categoryIds: 'categoryIds',
};

class TaskService {
  public content = new BehaviorSubject<Content | null>(null);

  // API

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

  // Setup assistant

  public async getSetupDone() {
    const setupDone = await AsyncStorage.getItem(AsyncStorageKeys.setupDone);
    return setupDone === 'true';
  }

  public async saveSetupDone(state: boolean) {
    await AsyncStorage.setItem(AsyncStorageKeys.setupDone, state ? 'true' : 'false');
  }

  // Selected categories

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
