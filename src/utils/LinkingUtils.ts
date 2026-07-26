import {Linking} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export class LinkingUtils {
  public static async openURL(url: string) {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch {
      await Linking.openURL(url);
    }
  }
}
