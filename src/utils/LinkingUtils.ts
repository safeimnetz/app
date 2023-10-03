import {Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export class LinkingUtils {
  public static async openURL(url: string) {
    if (await InAppBrowser.isAvailable()) {
      InAppBrowser.open(url);
    } else {
      Linking.openURL(url);
    }
  }
}
