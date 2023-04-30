/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import './translation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './views/Home';
import {Setting} from './views/Setting';
import {Locker} from './views/Locker';
import {Passcode} from './views/Passcode';
import {getData} from './utils';
import {Lock} from './types/Lock';
import {Spinner} from './components/Spinner';

const App = () => {
  const Stack = createNativeStackNavigator();
  const [hasItemStored, setHasItemStored] = useState<boolean>();

  useEffect(() => {
    const fetchStorage = async () => {
      const data = (await getData()) as Lock;
      if (data) {
        setHasItemStored(true);
      } else {
        setHasItemStored(false);
      }
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
      {hasItemStored === undefined ? (
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

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
