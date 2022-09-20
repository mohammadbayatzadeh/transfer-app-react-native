import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//simple comp used in Scan_QR screen
export const OR = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={['#fff', '#fff']}
        style={{flex: 1, height: 2}}></LinearGradient>
      <Text style={{textAlign: 'center', marginHorizontal: 5, color: '#fff'}}>
        OR
      </Text>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#fff', '#fff']}
        style={{flex: 1, height: 2}}></LinearGradient>
    </View>
  );
};
