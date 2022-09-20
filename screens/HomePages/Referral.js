import * as React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

//services
import {onShare} from '../../services/functions';
import {findActive} from '../../services/Switch_Account';
import axiosConfig, {retrieveData} from '../../services/config';

//components
import Back from '../../components/buttons/Back';
import Contact from '../../components/Contact';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {ImageStyles} from '../../styles/ImageStyles';
import {width} from '../../styles/scale';
import {moderateScale} from '../../styles/scale';

//images
const Referral_Pic = require('../../assets/icons/profile/Referral.png');
const Copy = require('../../assets/icons/profile/copy.png');

const Referral = ({navigation}) => {
  const [code, setCode] = React.useState('');
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState('wait...');

  //getting referral code from storage
  //getting user data from server
  React.useEffect(() => {
    findActive().then(username =>
      retrieveData('APP_DATA').then(value => {
        setCode(value[username].user.invitation_referral);
      }),
    );
    axiosConfig
      .get('/invited_by_me')
      .then(async value => {
        setError(`You haven't any successful invite...`);
        setData(value);
      })
      //handling errors
      .catch(error =>
        setError('Please check your internet connection, Try again.'),
      );
  }, []);
  return (
    <View style={{...styles.container, backgroundColor: '#fff'}}>
      <View style={styles.content}>
        <View style={styles.QRHeader}>
          <Back navigation={navigation} />
          <Text style={{...TextStyles.headerText, color: 'black'}}>
            Referral
          </Text>
          <View style={{width: width / 10}}></View>
        </View>
        <View
          style={{
            ...styles.transactionsContainer,
            marginVertical: moderateScale(20),
          }}>
          <Image source={Referral_Pic} style={ImageStyles.successfullImage} />
          <Text style={{...TextStyles.largeText, color: '#1D3A70'}}>
            Here’s $20
            <Text style={{...TextStyles.largeText, color: '#000'}}> free </Text>
            on us!
          </Text>
          <Text style={{...TextStyles.profileSubTitle, textAlign: 'center'}}>
            Share you referral link and earn $20
          </Text>
        </View>
        <View
          style={{
            ...styles.details,
            width: width - 50,
            backgroundColor: '#F9FAFB',
            padding: moderateScale(10),
            borderRadius: moderateScale(20),
            marginBottom: moderateScale(15),
          }}>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(code);
              ToastAndroid.showWithGravityAndOffset(
                'Referral code copied to clipboard',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
            }}>
            <Image source={Copy} style={ImageStyles.itemIcon} />
          </TouchableOpacity>
          <Text style={TextStyles.text}>{code}</Text>
          <TouchableOpacity onPress={onShare}>
            <Text style={TextStyles.cancel}>share</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {data.length > 0 ? (
            data.map((winner, index) => <Contact key={index} data={winner} />)
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  ...TextStyles.cancel,
                  textAlign: 'center',
                  paddingVertical: moderateScale(10),
                }}>
                {error}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Referral;
