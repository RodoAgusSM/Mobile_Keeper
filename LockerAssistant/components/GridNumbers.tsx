import React, {useEffect} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {screenHeight, screenWidth, storeData, getData} from '../utils/index';
import AwesomeButton from 'react-native-really-awesome-button';
import {LockType, LockStatus} from '../enums/Index';
import {Lock} from '../types/Lock';

const digits: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, -1, 9, -2];

export const GridNumbers = ({navigation}: any) => {
  const [password, setPassword] = React.useState<number[]>([]);
  const [updating, setUpdating] = React.useState<boolean>(false);
  const [b, setB] = React.useState<Lock>();

  useEffect(() => {
    const fetchStorage = async () => {
      const data = (await getData()) as Lock;
      setB(data);
    };
    fetchStorage();
  }, []);

  useEffect(() => {
    if (updating) {
      setUpdating(false);
    }
  }, [password]);

  const handlePress = (digit: number) => {
    if (password.length < 4) {
      setUpdating(true);
      setPassword([...password, digit]);
    }
  };

  const removeLastDigit = () => {
    setUpdating(true);
    setPassword(password.slice(0, password.length - 1));
  };

  const arrayToNumber = () => {
    return password[0] !== 0
      ? Number(password.join(''))
      : password[0] + '' + Number(password.slice(1).join(''));
  };

  const handleFinish = async () => {
    const lock = {
      lockerNumber: 7,
      lockType: LockType.electronicCombinationLock,
      lockCode: arrayToNumber(),
      lockStatus: LockStatus.locked,
    } as Lock;
    console.log('LOCK ', lock);
    await storeData(lock);
    navigation.navigate('Home');
  };

  return (
    <View style={GridNumbersStyles.container}>
      <View
        style={{
          height: screenHeight * 0.85,
          width: '95%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '35%',
            height: '5%',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.6,
            borderRadius: 8,
            borderColor: 'grey',
          }}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>{password}</Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={digits}
          horizontal={false}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
          renderItem={({item}) =>
            item >= 0 ? (
              <AwesomeButton
                progress={false}
                width={screenWidth * 0.21}
                height={screenHeight * 0.11}
                style={{margin: 3}}
                backgroundColor="grey"
                backgroundShadow="black"
                backgroundActive="#D3D3D3"
                backgroundDarker="black"
                disabled={password.length === 4 || updating}
                onPress={() => {
                  handlePress(item);
                }}>
                <Text>{item}</Text>
              </AwesomeButton>
            ) : item === -1 ? (
              <AwesomeButton
                progress={false}
                width={screenWidth * 0.21}
                height={screenHeight * 0.11}
                style={{margin: 3}}
                backgroundColor={password.length === 0 ? '#FFFFE0' : 'yellow'}
                backgroundShadow="black"
                backgroundActive="#FFFF90"
                backgroundDarker="black"
                disabled={password.length === 0 || updating}
                onPress={() => {
                  removeLastDigit();
                }}>
                <Text>{'x'}</Text>
              </AwesomeButton>
            ) : (
              <AwesomeButton
                progress={false}
                width={screenWidth * 0.21}
                height={screenHeight * 0.11}
                style={{margin: 3}}
                backgroundColor={password.length < 4 ? '#90EE90' : 'green'}
                backgroundShadow="black"
                backgroundActive="#95FE93"
                backgroundDarker="black"
                disabled={password.length < 4 || updating}
                onPress={async () => await handleFinish()}>
                <Text>{'✓'}</Text>
              </AwesomeButton>
            )
          }
          numColumns={3}
        />
      </View>
    </View>
  );
};

const GridNumbersStyles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
