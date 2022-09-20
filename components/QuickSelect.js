import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {TourGuideZone} from 'rn-tourguide';
import {useFocusEffect} from '@react-navigation/native';

//images
const Receive = require('../assets/icons/receiveIcon.png');
const Lottery = require('../assets/icons/modal/Lottery(5).png');
const Lottery_Icon = require('../assets/icons/modal/Lottery(6).png');
const Send = require('../assets/icons/sendIcon.png');
const Refresh = require('../assets/icons/refreshIcon.png');

//styles
import {TextStyles} from '../styles/TextStyles';
import {ImageStyles} from '../styles/ImageStyles';
import {styles} from '../styles/style';
import {moderateScale} from '../styles/scale';

// QuickSelect items
const Item = ({image, text, func, zone, zoneText}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={func && func}>
      <TourGuideZone zone={zone} text={zoneText} borderRadius={16}>
        <Image source={image} style={ImageStyles.itemIcon} />
      </TourGuideZone>
      <Text style={TextStyles.itemText}>{text}</Text>
    </TouchableOpacity>
  );
};
// QuickSelect menu in home screen
const QuickSelect = ({navigation}) => {
  const [translation, setTranslation] = React.useState(new Animated.Value(0));

  //create interpolate and Animated.loop for lottery roatation
  const route = translation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useFocusEffect(
    React.useCallback(() => {
      Animated.loop(
        Animated.timing(translation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    }, []),
  );
  return (
    <View style={styles.container}>
      <View style={styles.transferContainer}>
        <Item
          text="Deposit"
          image={Receive}
          func={() => navigation.navigate('Deposit')}
          zone={3}
          zoneText="Charge your wallet in less than a second"
        />
        <Item
          text="Transfer"
          image={Refresh}
          func={() => navigation.navigate('Scan_QR')}
          zone={4}
          zoneText="Transfer your money without any transaction fee."
        />
        <Item
          text="Withdraw"
          image={Send}
          func={() => navigation.navigate('Withdraw')}
          zone={5}
          zoneText="Withdraw your funds to any crypto account."
        />
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Lottery')}>
          <TourGuideZone
            zone={6}
            text={`Participate in the world's largest lottery system, held monthly.`}
            borderRadius={5}>
            <View style={{alignItems: 'center'}}>
              <Animated.View
                style={{
                  width: moderateScale(30),
                  height: moderateScale(30),
                  transform: [{rotate: route}],
                }}>
                <Image
                  source={Lottery}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </Animated.View>
              <Image
                source={Lottery_Icon}
                style={{
                  width: moderateScale(12),
                  height: moderateScale(12),
                  resizeMode: 'contain',
                  position: 'absolute',
                  transform: [{translateY: -moderateScale(4)}],
                }}
              />
            </View>
          </TourGuideZone>
          <Text style={TextStyles.itemText}>Lottery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuickSelect;
