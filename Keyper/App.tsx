import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import {
  StatusBar,
  DeviceEventEmitter,
  AppState,
  NativeModules,
} from 'react-native';
import './translation';
import { useTranslation } from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuickActions from 'react-native-quick-actions';
import { Home } from './views/Home';
import { Setting } from './views/Setting';
import { Locker } from './views/Locker';
import { Passcode } from './views/Passcode';
import {
  getLockData,
  getUserPreferencesData,
  removeLocker,
} from './utils/index';
import { Spinner } from './components/Spinner';
import { UserPreferences } from './types/UserPreferences';
import { Lock } from './types/Lock';
import { Screen, QuickAction } from './enums/Index';

const { RNSharedWidget } = NativeModules;

const App = () => {
  const { t, i18n } = useTranslation();
  const Stack = createNativeStackNavigator();
  const appState = useRef(AppState.currentState);
  const [, setAppStateVisible] = useState(appState.current);
  const [firstScreen, setFirstScreen] = useState<string | undefined>();

  useEffect(() => {
    const fetchUserPreferences = async () => {
      const userPreferences =
        (await getUserPreferencesData()) as UserPreferences;
      if (userPreferences) {
        i18n.changeLanguage(userPreferences.language);
      }
    };
    fetchUserPreferences();
  }, []);

  useEffect(() => {
    const procesShourtcut = (item: any) => {
      if (item.type === QuickAction.newLocker) {
        removeLocker();
        setFirstScreen(Screen.setting);
      }
    };

    QuickActions.popInitialAction()
      .then((item: any) => {
        procesShourtcut(item);
      })
      .catch((err: any) => {});

    DeviceEventEmitter.addListener('quickActionShortcut', (item: any) => {
      procesShourtcut(item);
    });

    QuickActions.setShortcutItems([
      {
        title: t('ForceTouch.newLocker'),
        type: QuickAction.newLocker,
        icon: 'Add',
        userInfo: {
          url: 'url',
        },
      },
    ]);
    fetchStorage();

    return () => {
      QuickActions.clearShortcutItems();
    };
  }, [i18n.language]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        QuickActions.setShortcutItems([
          {
            title: t('ForceTouch.newLocker'),
            type: QuickAction.newLocker,
            icon: 'Add',
            userInfo: {
              url: 'url',
            },
          },
        ]);
        fetchStorage();
      } else if (nextAppState === 'inactive' || nextAppState === 'background') {
        setFirstScreen(undefined);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const fetchStorage = async () => {
    const data = (await getLockData()) as Lock;
    handleWidget(data);
    if (data) {
      setFirstScreen(Screen.passcode);
    } else {
      setFirstScreen(Screen.home);
    }
    await RNBootSplash.hide({ fade: true, duration: 650 });
  };

  const handleWidget = (data: Lock | null) => {
    if (data) {
      RNSharedWidget.setData(
        'lockerNumberAndPasscode',
        JSON.stringify({
          numberTitle: t('Code.lockNumber'),
          number: data?.lockNumber as string,
          passcodeTitle: t('Code.passcode'),
          passcode: data?.lockCode as string,
        }),
        (status: number | null) => {
          console.log('---------');
          console.log('Status ', status);
          console.log('---------');
        },
      );
    } else {
      RNSharedWidget.setData(
        'lockerNumberAndPasscode',
        JSON.stringify({
          numberTitle: t('Code.lockNumber'),
          number: t('Code.noLockNumber'),
          passcodeTitle: t('Code.passcode'),
          passcode: t('Code.noPasscode'),
        }),
        (status: number | null) => {
          console.log('---------');
          console.log('Status ', status);
          console.log('---------');
        },
      );
    }
  };

  if (firstScreen === undefined) return <Spinner />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar
          hidden={false}
          animated={true}
          networkActivityIndicatorVisible={true}
          backgroundColor={'black'}
        />
        <Stack.Navigator
          initialRouteName={firstScreen}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name={Screen.home} component={Home} />
          <Stack.Screen name={Screen.setting} component={Setting} />
          <Stack.Screen name={Screen.locker} component={Locker} />
          <Stack.Screen name={Screen.passcode} component={Passcode} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
