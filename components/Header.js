import React from 'react';
import {Text, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {TourGuideZone} from 'rn-tourguide';

//services
import {retrieveData} from '../services/config';
import {findActive} from '../services/Switch_Account';

//images
const cardMark = require('../assets/icons/cardMarks.png');
const Design = require('../assets/icons/Design.png');

//components
import Notif from './buttons/Notif';

//styles
import {TextStyles} from '../styles/TextStyles';
import {ImageStyles} from '../styles/ImageStyles';
import {styles} from '../styles/style';

//used in Home screen
const Header = () => {
  const [inventory, setInventory] = React.useState(0);
  const [username, setUsername] = React.useState('');
  const [name, setName] = React.useState('');

  //getting user data
  useFocusEffect(
    React.useCallback(() => {
      //getting data of active user
      findActive().then(
        async username =>
          await retrieveData('APP_DATA').then(value => {
            //serState data
            setInventory(value[username].user.inventory);
            setUsername(value[username].user.username);
            setName(value[username].user.first_name);
          }),
      );
    }, []),
  );

  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#13ABB7', '#77EBAC']}
        style={styles.up}>
        <View style={styles.topDetails}>
          <View style={{flex: 1}}>
            <Text style={TextStyles.wellcome}>Welcome Back!</Text>
            <Text style={TextStyles.userName} numberOfLines={1}>
              {name ? name : username}
            </Text>
          </View>
          <TourGuideZone
            zone={2}
            text={'Here is your Notifications'}
            borderRadius={16}>
            <Notif />
          </TourGuideZone>
        </View>
        <View style={styles.topCard}>
          <View style={{justifyContent: 'space-between'}}>
            <Image source={cardMark} style={ImageStyles.walletMark} />
            <Text style={TextStyles.walletText}>Your current wallet</Text>
          </View>
          <View style={ImageStyles.design}>
            <Image source={Design} style={ImageStyles.designPic} />
            <Image source={Design} style={ImageStyles.designPic} />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.down}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#06B89D', '#08AD95']}
          style={styles.bottomCard}>
          <Text style={{...TextStyles.wallet, flex: 1}} numberOfLines={1}>
            ${inventory}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={ImageStyles.circleOne}></View>
            <View style={ImageStyles.circleTwo}></View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default Header;
