import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

//services
import {gettingDate, gettingTime} from '../services/functions';

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

//transacton item in Home and activity Screens
const Transaction = ({data}) => {
  const [visible, setVisible] = React.useState(false);
  let name = '';
  let up;
  let color;
  let photo;
  let type;
  let status;
  //modifying details base on trans_status
  switch (data.trans_status) {
    case 'transfer_withdrawal':
      name = 'to: ' + data.destination;
      photo = Transfer;
      up = false;
      type = data.type;
      break;
    case 'transfer_deposit':
      name = 'from: ' + data.source;
      photo = Transfer;
      up = true;
      type = data.type;
      break;
    case 'withdrawal':
      name = 'Withdraw';
      photo = Withdraw;
      up = false;
      break;
    case 'deposit':
      name = 'Deposit';
      photo = Deposit;
      up = true;
      break;
  }
    //modifying details base on status

  switch (data.status) {
    case 'success':
      color = '#1DAB87';
      status = 'Success';
      break;
    case 'pending':
      color = '#FBBB00';
      status = 'Pending';
      break;
    case 'fail':
      color = '#F14336';
      status = 'Failed';
      break;
  }
  return (
    <TouchableOpacity
      style={{justifyContent: 'center', alignItems: 'center'}}
      onPress={() => setVisible(true)}>
      <DetailsModal visible={visible} setVisible={setVisible} data={data} />
      <View style={styles.transContainer}>
        <View style={styles.imageContainer}>
          <Image source={photo} style={ImageStyles.itemIcon} />
        </View>
        <View style={{flex: 1}}>
          <View style={styles.transDetails}>
            <Text style={{...TextStyles.transName, flex: 1}} numberOfLines={1}>
              {name}
            </Text>
            <Text
              style={up ? TextStyles.UpTransPrice : TextStyles.DownTransPrice}
              numberOfLines={1}>
              {up ? '+' : '-'}${data.normalize_amount}
            </Text>
          </View>
          <View style={styles.transDetails}>
            <Text style={TextStyles.transType}>
              {type}
              <Text style={{color: color}}>{`(${status})`}</Text>
            </Text>
            <Text style={TextStyles.transType}>
              {`${gettingDate(new Date(data.created_at))}  ${gettingTime(
                new Date(data.created_at),
              )} `}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Transaction;
