import * as React from 'react';
import {Text, View, Image, ScrollView} from 'react-native';

//services
import {findActive} from '../../services/Switch_Account';
import {retrieveData} from '../../services/config';
import {REACT_APP_URL_MEDIA} from '@env';

//components
import Back from '../../components/buttons/Back';
import {Button} from '../../components/buttons/Button';
import ImagePick from '../../components/ImagePick';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {ImageStyles} from '../../styles/ImageStyles';
import {width} from '../../styles/scale';
import {moderateScale} from '../../styles/scale';

const My_Account = ({navigation}) => {
  const [data, setData] = React.useState('');

  //getting active account data
  React.useEffect(() => {
    findActive().then(username =>
      retrieveData('APP_DATA').then(value => {
        setData(value[username].user);
      }),
    );
  }, []);

  return (
    <View style={{...styles.QRContainer, backgroundColor: '#fff'}}>
      <View style={styles.content}>
        <View style={styles.QRHeader}>
          <Back navigation={navigation} dircetion="Profile" />
          <Text style={{...TextStyles.headerText, color: 'black'}}>
            Account Info
          </Text>
          <View style={{width: width / 10}}></View>
        </View>
        <ScrollView>
          <View
            style={{
              ...styles.transactionsContainer,
              marginVertical: moderateScale(15),
            }}>
            <View style={{marginVertical: moderateScale(20)}}>
              <Image
                source={{uri: `${REACT_APP_URL_MEDIA}${data.photo}`}}
                style={ImageStyles.largeProfile}
              />
              <ImagePick />
            </View>
          </View>
          <Text style={TextStyles.profileTitle}>Personal Info</Text>
          <View
            style={{
              ...styles.simpleContainer,
              marginBottom: moderateScale(50),
            }}>
            <View style={{...styles.details, paddingVertical: 10}}>
              <Text style={TextStyles.text}>Your name</Text>
              <Text style={TextStyles.cancel} numberOfLines={1}>
                {data.first_name ? data.first_name : 'Enter your name'}
                {data.last_name ? ` ${data.last_name}` : ''}
              </Text>
            </View>
            <View style={{...styles.details, paddingVertical: 10}}>
              <Text style={TextStyles.text}>Shop</Text>
              <Text style={TextStyles.cancel} numberOfLines={1}>
                {data.shop ? data.shop : 'Enter your shop name'}
              </Text>
            </View>
            <View style={{...styles.details, paddingVertical: 10}}>
              <Text style={TextStyles.text}>Wallet address</Text>
              <Text style={TextStyles.cancel}>
                {data.wallet_address
                  ? 'confirmed'
                  : 'Enter your wallet address'}
              </Text>
            </View>
          </View>
          <Text style={TextStyles.profileTitle}> Contact Info </Text>
          <View style={styles.simpleContainer}>
            <View style={{...styles.details, paddingVertical: 10}}>
              <Text style={TextStyles.text}>Birthday</Text>
              <Text style={TextStyles.cancel}>
                {data.birthday ? data.birthday : 'Enter your birthday'}
              </Text>
            </View>
            <View style={{...styles.details, paddingVertical: 10}}>
              <Text style={TextStyles.text}> Email</Text>
              <Text style={TextStyles.cancel} numberOfLines={1}>
                {data.email}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={{flex: 1}}></View>
        <Button
          title="Edit"
          func={() => navigation.navigate('My_Account_Edit')}
          width={width - 50}
          firstColor="rgba(5, 54, 56, 0.08)"
          secondColor="rgba(5, 54, 56, 0.08)"
          textColor="rgba(6, 54, 57, 1)"
        />
      </View>
    </View>
  );
};

export default My_Account;
