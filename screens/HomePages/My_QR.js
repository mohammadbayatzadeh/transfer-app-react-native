import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import {useFocusEffect} from '@react-navigation/native';
import RNQRGenerator from 'rn-qr-generator';

//services
import {retrieveData} from '../../services/config';
import {findActive} from '../../services/Switch_Account';
import {REACT_APP_URL_MEDIA} from "@env"

//components
import Back from '../../components/buttons/Back';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {ImageStyles} from '../../styles/ImageStyles';
import {width, moderateScale} from '../../styles/scale';

//images
const Logo = require('../../assets/icons/Frodo_Logo.png');
const Copy = require('../../assets/icons/profile/copy.png');
const Background = require('../../assets/icons/QR/QR_background.png');

const My_QR = ({navigation}) => {
  const [data, setData] = React.useState('');
  const [qr, serQr] = React.useState('');

  //getting active account data
  useFocusEffect(
    React.useCallback(() => {
      findActive().then(username =>
        retrieveData('APP_DATA').then(async value => {
          setData(value[username].user);
          //create qr code image ( rn-qr-generator) to share with it(react-native-share)
          await RNQRGenerator.generate({
            value: `https://www.frodopay.io/${data.username}`,
            height: 200,
            width: 200,
            padding: {top: 10, left: 10, right: 10, bottom: 10},
          }).then(response => {
            serQr(response);
          });
        }),
      );
    }, []),
  );
  return (
    <ImageBackground source={Background} style={{flex: 1}}>
      <View style={{...styles.QRContainer, paddingVertical: 15}}>
        <ScrollView>
          <View style={styles.QRHeader}>
            <Back navigation={navigation} />
            <Text style={{...TextStyles.headerText, color: '#fff'}}>
              My QR Code
            </Text>
            <View style={{width: width / 10}}></View>
          </View>

          <View
            style={{
              ...styles.profileContainer,
              marginTop: moderateScale(40),
              marginBottom: moderateScale(100),
              width: width - 50,
            }}>
            <View style={styles.details}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: `${REACT_APP_URL_MEDIA}${data.photo}`}}
                  style={ImageStyles.smallProfile}
                />
                <View style={{flex: 1}}>
                  <View style={styles.details}>
                    <Text
                      style={{...TextStyles.profileTitle, flex: 1}}
                      numberOfLines={1}>
                      {data.username}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        Clipboard.setString(
                          `https://www.frodopay.io/${data.username}`,
                        );
                        ToastAndroid.showWithGravityAndOffset(
                          'Link copied to clipboard',
                          ToastAndroid.SHORT,
                          ToastAndroid.BOTTOM,
                          25,
                          50,
                        );
                      }}>
                      <Image source={Copy} style={ImageStyles.searchImage} />
                    </TouchableOpacity>
                  </View>
                  <Text style={TextStyles.profileSubTitle} numberOfLines={1}>
                    www.frodopay.io/{data.username}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.topLayer}>
              <QRCode
                value={
                  data.username
                    ? `https://www.frodopay.io/${data.username}`
                    : 'NA'
                }
                size={width - moderateScale(200)}
                logo={Logo}
                logoSize={moderateScale(40)}
                logoBackgroundColor="transparent"
              />
            </View>
            <Text
              style={{...TextStyles.headerText, color: '#fff'}}
              onPress={() => {
                const shareImageBase64 = {
                  message: `This in my QR Code and it's my link https://www.frodopay.io/${data.username}`,
                  url: qr.uri,
                };
                Share.open(shareImageBase64);
              }}>
              Share QR Code
            </Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default My_QR;
