import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

//services
import {findActive, saveAppData} from '../services/Switch_Account';
import {gettingDate, gettingTime} from '../services/functions';
import {retrieveData} from '../services/config';

//components
import {DetailsModal} from './DetailsModal';

//images
const Transfer = require('../assets/icons/refreshIcon.png');
const Withdraw = require('../assets/icons/sendIcon.png');
const Deposit = require('../assets/icons/receiveIcon.png');

//styles
import {TextStyles} from '../styles/TextStyles';
import {styles} from '../styles/style';
import {ImageStyles} from '../styles/ImageStyles';

//notification item used in notification screen
const NotifItem = ({data}) => {
  const [visible, setVisible] = React.useState(false);
  let photo;

  //choosing notif image
  switch (data.type) {
    case 'TRANSFER':
      photo = Transfer;
      break;

    case 'WITHDRAWAL':
      photo = Withdraw;
      break;
    case 'Deposit':
      photo = Deposit;
      break;
  }

  //changing notif status(unread to read)
  const changeRead = async data => {
    //getting notifications of active account
    await findActive().then(async username => {
      await retrieveData('APP_DATA').then(async value => {
        //change the status to read
        const notif = value[username].notification;
        data.isRead = true;
        const notifs = notif.filter(item => item.id !== data.id);
        const allNotif = [data, ...notifs];
        //sort them
        allNotif.sort((a, b) => {
          let fa = a.id;
          let fb = b.id;
          if (fa < fb) {
            return 1;
          }
          if (fa > fb) {
            return -1;
          }
          return 0;
        });
        //store them
        await saveAppData({
          notification: allNotif,
          transactions: value[username].transactions,
        });
      });
    });
  };

  return (
    <TouchableOpacity
      style={{justifyContent: 'center', alignItems: 'center'}}
      onPress={() => (setVisible(true), changeRead(data))}>
      <DetailsModal visible={visible} setVisible={setVisible} data={data} />
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={photo} style={ImageStyles.itemIcon} />
        </View>
        <View style={{flex: 1}}>
          <View style={styles.details}>
            <Text style={TextStyles.profileTitle} numberOfLines={1}>
              {data.title}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={TextStyles.transType}>{`${gettingDate(
              new Date(data.time),
            )}   ${gettingTime(new Date(data.time))}`}</Text>
            {!data.isRead && (
              <Text style={{...TextStyles.thinText, color: '#1DAB87'}}>
                NEW
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotifItem;
