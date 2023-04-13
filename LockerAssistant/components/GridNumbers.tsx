import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {screenHeight, screenWidth} from '../utils/index';

const digits: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, -1, 9, -2];

export const GridNumbers = ({navigation}: any) => {
  const [password, setPassword] = React.useState<number[]>([]);

  const handlePress = (digit: number) => {
    if (password.length < 4) {
      setPassword([...password, digit]);
    }
  };

  const removeLastDigit = () => {
    setPassword(password.slice(0, password.length - 1));
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
              <TouchableOpacity
                style={{
                  width: '30%',
                  height: screenHeight * 0.15,
                  margin: 2,
                  borderRadius: 14,
                  borderWidth: 0.5,
                  backgroundColor: 'grey',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                disabled={password.length === 4}
                onPress={() => handlePress(item)}>
                <Text style={{fontSize: 20, fontWeight: '600'}}>{item}</Text>
              </TouchableOpacity>
            ) : item === -1 ? (
              <TouchableOpacity
                style={{
                  width: '30%',
                  height: screenHeight * 0.15,
                  margin: 2,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  backgroundColor: password.length === 0 ? '#ffffe0' : 'yellow',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                disabled={password.length === 0}
                onPress={() => removeLastDigit()}>
                <Text style={{fontSize: 22, fontWeight: '600'}}>{'x'}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  width: '30%',
                  height: screenHeight * 0.15,
                  margin: 2,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  backgroundColor: password.length < 4 ? '#90EE90' : 'green',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                disabled={password.length < 4}
                onPress={() => navigation.navigate('Home')}>
                <Text style={{fontSize: 22, fontWeight: '600'}}>{'✓'}</Text>
              </TouchableOpacity>
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
