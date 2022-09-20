import React from 'react';
import {Text, View, Image} from 'react-native';

//services
import {REACT_APP_URL_MEDIA} from '@env';

//styles
import {TextStyles} from '../styles/TextStyles';
import {styles} from '../styles/style';
import {ImageStyles} from '../styles/ImageStyles';
import {moderateScale} from '../styles/scale';

const AKS = require('../assets/icons/QR/profile.png');

//Lottery winners items used in Lottery screen
const LotteryWinner = ({image, name, score, large = false}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: large ? '100%' : '25%',
        paddingVertical: moderateScale(10),
      }}>
      <Image
        style={{
          width: large ? moderateScale(90) : moderateScale(50),
          height: large ? moderateScale(90) : moderateScale(50),
          resizeMode: 'contain',
          borderRadius: moderateScale(90),
          marginBottom: moderateScale(5),
        }}
        source={AKS}
      />
      <Text
        numberOfLines={1}
        style={{
          ...TextStyles.LotteryWinnerText,
          fontSize: large ? moderateScale(14) : moderateScale(10),

          marginBottom: moderateScale(5),
        }}>
        Tiana Dokidis
      </Text>

      <Text
        style={{
          ...TextStyles.LotteryWinnerText,
          fontSize: large ? moderateScale(14) : moderateScale(10),

          marginBottom: moderateScale(5),
        }}
        numberOfLines={1}>
        Score: 36.50000
      </Text>
    </View>
  );
};

export default LotteryWinner;
