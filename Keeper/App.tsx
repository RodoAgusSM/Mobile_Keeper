/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import './translation';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './views/Home';
import {Setting} from './views/Setting';
import {Locker} from './views/Locker';
import {Passcode} from './views/Passcode';
import {getLockData} from './utils';
import {Lock} from './types/Lock';
import {Spinner} from './components/Spinner';

const App = () => {
  const Stack = createNativeStackNavigator();
  const [hasItemStored, setHasItemStored] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchStorage = async () => {
      const data = (await getLockData()) as Lock;
      if (data) {
        setHasItemStored(true);
      } else {
        setHasItemStored(false);
      }
      await RNBootSplash.hide({fade: true, duration: 650});
    };
    fetchStorage();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        hidden={false}
        animated={true}
        networkActivityIndicatorVisible={true}
        backgroundColor={'black'}
      />
      {hasItemStored === null ? (
        <Spinner />
      ) : (
        <Stack.Navigator
          initialRouteName={hasItemStored ? 'Passcode' : 'Home'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="Locker" component={Locker} />
          <Stack.Screen name="Passcode" component={Passcode} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
