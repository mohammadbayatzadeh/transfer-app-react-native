import * as React from 'react';
import {View} from 'react-native';

//styles
import {moderateScale} from '../styles/scale';
import {styles} from '../styles/style';

//simple comp for put space between some item in Profile screen
const Space = () => {
  return (
    <View
      style={{
        ...styles.QRHeader,
        height: moderateScale(60),
      }}>
      <View
        style={{
          borderBottomColor: 'rgba(243, 244, 246, 1)',
          borderBottomWidth: 1,
          flex: 1,
        }}></View>
    </View>
  );
};

export default Space;
