import {CommonActions, createNavigationContainerRef} from '@react-navigation/native';

export class NavigationUtils {
  public static navigationRef = createNavigationContainerRef();

  public static navigate(name: string, params?: {}) {
    if (this.navigationRef.isReady()) {
      (this.navigationRef.navigate as any)(name, params);
    }
  }

  public static navigateWithoutBack(name: string, params?: {}) {
    if (this.navigationRef.isReady()) {
      this.navigationRef.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: name, params: params}],
        }) as any,
      );
    }
  }

  public static goBack() {
    if (this.navigationRef.isReady()) {
      this.navigationRef.goBack();
    }
  }
}
