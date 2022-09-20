import React from 'react';
import {Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

//components
import Transaction from './Transaction';

//services
import {retrieveData} from '../services/config';
import {findActive} from '../services/Switch_Account';
import {gettingDate} from '../services/functions';

//styles
import {TextStyles} from '../styles/TextStyles';
import {styles} from '../styles/style';

//shows transactions list
const Transactions = () => {
  const [data, setData] = React.useState([]);

  //getting list data of active account
  useFocusEffect(
    React.useCallback(() => {
      //getting data of active user
      findActive().then(username =>
        retrieveData('APP_DATA').then(value => {
          value[username].transactions.results &&
            setData(value[username].transactions.results);
        }),
      );
    }, []),
  );
  let now = gettingDate(new Date());

  return (
    <View style={styles.container}>
      <View style={styles.transactionsContainer}>
        <View style={styles.purchaseDetails}>
          <Text style={TextStyles.text}>Today : {now}</Text>
        </View>
        {data.length > 0 ? (
          data.map(item => <Transaction key={item.id} data={item} />)
        ) : (
          <View style={{flex: 1}}>
            <Text style={TextStyles.text}>There is no transaction ...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Transactions;
