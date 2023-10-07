import AsyncStorage from '@react-native-async-storage/async-storage';
import {BehaviorSubject} from 'rxjs';
import {Config} from '../Config';
import {Content} from '../models/Content';

const AsyncStorageKeys = {
  setupDone: 'setupDone',
  inlineTutorialDone: 'inlineTutorialDone',
  categoryIds: 'categoryIds',
  readTaskIds: 'readTaskIds',
};

class TaskService {
  public content = new BehaviorSubject<Content | null>(null);
  public selectedCategories = new BehaviorSubject<number[]>([]);
  public readTaskIds = new BehaviorSubject<number[]>([]);

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

  // Inline tutorial

  public async getInlineTutorialDone() {
    const inlineTutorialDone = await AsyncStorage.getItem(AsyncStorageKeys.inlineTutorialDone);
    return inlineTutorialDone === 'true';
  }

  public async saveInlineTutorialDone(state: boolean) {
    await AsyncStorage.setItem(AsyncStorageKeys.inlineTutorialDone, state ? 'true' : 'false');
  }

  // Selected categories

  public async getSelectedCategoryIds() {
    const idsJson = await AsyncStorage.getItem(AsyncStorageKeys.categoryIds);
    if (idsJson == null) {
      return [];
    }
    const ids = JSON.parse(idsJson) as number[];
    this.selectedCategories.next(ids);
    return ids;
  }

  public async saveSelectedCategoryIds(ids: number[]) {
    await AsyncStorage.setItem(AsyncStorageKeys.categoryIds, JSON.stringify(ids));
    await this.getSelectedCategoryIds();
  }

  // Reset app

  public async resetApp() {
    await this.saveSelectedCategoryIds([]);
    await this.saveSetupDone(false);
    await this.saveInlineTutorialDone(false);
  }

  // Read tasks

  public async getReadTaskIds() {
    const idsJson = await AsyncStorage.getItem(AsyncStorageKeys.readTaskIds);
    if (idsJson == null) {
      return [];
    }
    const ids = JSON.parse(idsJson) as number[];
    this.readTaskIds.next(ids);
    return ids;
  }

  public async toggleReadTask(taskId: number) {
    let ids = await this.getReadTaskIds();
    if (ids.includes(taskId)) {
      ids = ids.filter(i => i !== taskId);
    } else {
      ids = ids.concat(taskId);
    }

    await AsyncStorage.setItem(AsyncStorageKeys.readTaskIds, JSON.stringify(ids));
    this.readTaskIds.next(ids);
  }
}

export const _taskService = new TaskService();
