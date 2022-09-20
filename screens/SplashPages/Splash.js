import React from 'react';
import {Text, View, Image, BackHandler} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as RootNavigation from '../../RootNavigation';
import {useFocusEffect} from '@react-navigation/native';

//services
import {retrieveData, storeData} from '../../services/config';

//images
const Logo = require('../../assets/icons/login-signup/Frodopay.png');

//styles
import {styles} from '../../styles/style';
import {ImageStyles} from '../../styles/ImageStyles';
import {TextStyles} from '../../styles/TextStyles';

const Spalsh = () => {
  //provide hardware backbutton press
  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );
      return () => backHandler.remove();
    }, []),
  );

  //pushes user to different routes
  React.useEffect(() => {
    const navigate = async () => {
      //checking logged in user
      await retrieveData('LOGGEDIN').then(value =>
        value
        //user logged in 
          ? setTimeout(
              async () =>
              //checking pin saved or not
                await retrieveData('PIN').then(pass => {
                  //user has pin
                  pass > 2 || pass === 0
                    ? RootNavigation.navigate('AuthApp', {
                        screen: 'Create_PIN',
                      })
                      //user skipped pin
                    : RootNavigation.navigate('HomeApp');
                }),
              1500,
            )
            //user logged out 
            //checking first time opened app
          : retrieveData('FIRSTTIME').then(value =>
              value
              //not first time
                ? setTimeout(() => RootNavigation.navigate('AuthApp'), 1500)
                //first time
                : (setTimeout(
                    () => RootNavigation.navigate('TermAndPolicy'),
                    1500,
                  ),
                  //create all the necessary data 
                  storeData('APP_DATA', {}),
                  storeData('DEPOSIT', true),
                  storeData('DEFAULT', true),
                  storeData('WITHDRAWAL', true),
                  storeData('USER', true),
                  storeData('TRANSFER', true),
                  storeData('PIN', 0),
                  storeData('GUIDE', {Home: true, Profile: true})),
            ),
      );
    };

    navigate();
  }, []);
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#13ABB7', '#77EBAC']}
        style={styles.container}>
        <Image source={Logo} style={ImageStyles.splashLogo} />
        <Text style={TextStyles.frodopay}>Frodo Pay</Text>
        <Text style={TextStyles.normal}>To the brighter future </Text>
      </LinearGradient>
    </View>
  );
};

export default Spalsh;
