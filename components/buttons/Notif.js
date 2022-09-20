import React from 'react';
import {Text, Image, TouchableOpacity, View} from 'react-native';
import * as RootNavigation from '../../RootNavigation';
import {useFocusEffect} from '@react-navigation/native';

//services
import {retrieveData} from '../../services/config';
import {findActive} from '../../services/Switch_Account';

//images
const Bell_Image = require('../../assets/icons/Shape.png');

//styles
import {ImageStyles} from '../../styles/ImageStyles';
import {moderateScale} from '../../styles/scale';

//notification button used in Home screen
const Notif = () => {
  const [count, setCount] = React.useState(0);

  //counting unread notifications
  useFocusEffect(
    React.useCallback(() => {
      //getting data from active account
      findActive().then(async username => {
        await retrieveData('APP_DATA').then(data => {
          if (data[username].notification.length > 0) {
            //counts unread notifs
            const counter = data[username].notification.filter(
              item => item.isRead === false,
            );
            setCount(counter.length);
          }
        });
      });
    }, []),
  );

  return (
    <TouchableOpacity
      style={ImageStyles.bellImage}
      onPress={() => RootNavigation.navigate('Notification')}>
      <View>
        <Image source={Bell_Image} style={ImageStyles.itemIcon} />
        {count > 0 && (
          <View
            style={{
              width: moderateScale(15),
              height: moderateScale(15),
              backgroundColor: 'red',
              borderRadius: 1000,
              position: 'absolute',
              alignSelf: 'flex-end',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: moderateScale(10)}}>
              {count}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Notif;
