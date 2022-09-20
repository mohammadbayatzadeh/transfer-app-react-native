import * as React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

//services
import {retrieveData} from '../../services/config';
import {findActive} from '../../services/Switch_Account';

//components
import Back from '../../components/buttons/Back';
import NotifItem from '../../components/NotifItem';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {width} from '../../styles/scale';

const Notification = ({navigation}) => {
  const [data, setData] = React.useState([]);

  //get active account notifications from storage
  useFocusEffect(
    React.useCallback(() => {
      findActive().then(async username => {
        await retrieveData('APP_DATA').then(async value => {
          //setState them
          value[username].notification
            ? setData(value[username].notification)
            : setData([]);
        });
      });
    }, []),
  );

  return (
    <View style={{...styles.QRContainer, backgroundColor: '#fff'}}>
      <View style={styles.content}>
        <View style={styles.QRHeader}>
          <Back navigation={navigation} />
          <Text style={{...TextStyles.headerText, color: 'black'}}>
            Notificaion
          </Text>
          <View style={{width: width / 10}}></View>
        </View>
        <ScrollView>
          {data.length > 0 ? (
            data.map(notif => <NotifItem key={notif.id} data={notif} />)
          ) : (
            <View style={styles.content}>
              <Text style={TextStyles.cancel}>No notification yet ... </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Notification;
