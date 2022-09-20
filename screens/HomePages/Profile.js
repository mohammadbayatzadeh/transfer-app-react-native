import * as React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  BackHandler,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import CrispChat, {
  resetSession,
  setTokenId,
  setUserAvatar,
  setUserEmail,
  setUserNickname,
} from 'react-native-crisp-chat-sdk';
import {TourGuideZone, useTourGuideController} from 'rn-tourguide';

//services
import axiosConfig, {storeData} from '../../services/config';
import {retrieveData} from '../../services/config';
import {findActive, logoutUser} from '../../services/Switch_Account';
import {REACT_APP_URL_MEDIA} from '@env';

//components
import Footer from '../../components/Footer';
import ProfileItems from '../../components/ProfileItems';
import Space from '../../components/Space';
import Account_Item from '../../components/Account_Item';
import Loading from '../../components/Loading';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {ImageStyles} from '../../styles/ImageStyles';
import {width} from '../../styles/scale';
import {moderateScale} from '../../styles/scale';

//images
const AccountPic = require('../../assets/icons/profile/account_pic.png');
const RatePic = require('../../assets/icons/profile/rate_pic.png');
const PasswordPic = require('../../assets/icons/profile/password_pic.png');
const FAQPic = require('../../assets/icons/profile/faq_pic.png');
const SettingsPic = require('../../assets/icons/profile/settings_pic.png');
const Crown = require('../../assets/icons/profile/crown.png');
const Logout = require('../../assets/icons/profile/logout.png');
const QR = require('../../assets/icons/QR/QR.png');
const Plus = require('../../assets/icons/profile/plus.png');
const PIN = require('../../assets/icons/profile/Pin_Setting.png');
const Contact = require('../../assets/icons/profile/contact.png');
const News = require('../../assets/icons/profile/news.png');
const Ad = require('../../assets/icons/profile/Ad.png');
const Community = require('../../assets/icons/profile/community.png');

const Profile = ({navigation}) => {
  const [data, setData] = React.useState('');
  const [modalvisible, setModalvisible] = React.useState(false);
  const [keys, setKeys] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [chat, setChat] = React.useState(false);

  //getting user data and accounts data
  useFocusEffect(
    React.useCallback(() => {
      findActive().then(
        async username =>
          await retrieveData('APP_DATA').then(async value => {
            //counting loggedin accounts
            setData(value[username].user);
            const keys = Object.keys(value);
            const mySet = new Set([username, ...keys]);
            setKeys([...mySet]);
            //config session for Crisp
            setChat(false);
            resetSession();
            setTokenId(username);
            setUserEmail(data[username].user.email);
            setUserNickname(username);
            setUserAvatar(`${REACT_APP_URL_MEDIA}${data[username].user.photo}`);
          }),
      );
      //provide hardware backbutton press
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );
      return () => backHandler.remove();
    }, []),
  );

  const {canStart, start, eventEmitter, tourKey} =
    useTourGuideController('Profile');

  //onstop function of tourguide
  const handleOnStop = () =>
    retrieveData('GUIDE').then(async value => {
      await storeData('GUIDE', {...value, Profile: false});
    });

  // start the tourguide
  React.useEffect(() => {
    retrieveData('GUIDE').then(async value => {
      if (canStart && value.Profile) {
        start();
      }
      eventEmitter.on('stop', handleOnStop);
      return () => {
        eventEmitter.off('stop', handleOnStop);
      };
    });
  }, [canStart]);

  return (
    <View style={{...styles.QRContainer, backgroundColor: '#fff'}}>
      <View style={styles.content}>
        {chat && <CrispChat />}
        <View style={styles.QRHeader}>
          <TourGuideZone
            zone={1}
            text={`you can see username ,link and Qr code here`}
            tourKey={tourKey}
            borderRadius={10}>
            <TouchableOpacity onPress={() => navigation.navigate('My_QR')}>
              <Image
                source={QR}
                style={{width: width / 10, height: width / 10}}
              />
              <Loading visible={loading} />
            </TouchableOpacity>
          </TourGuideZone>
          <Text style={{...TextStyles.headerText, color: 'black'}}>
            Profile
          </Text>
          <View style={{width: width / 10}}></View>
        </View>
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: moderateScale(20),
            }}>
            <View style={{marginVertical: moderateScale(20)}}>
              <Image
                source={{uri: `${REACT_APP_URL_MEDIA}${data.photo}`}}
                style={ImageStyles.largeProfile}
              />
            </View>
            <View style={styles.details}>
              <Text style={TextStyles.normal}>{data.username}</Text>
            </View>
            <Text style={TextStyles.text}>{data.email}</Text>
          </View>
          <TourGuideZone
            zone={2}
            text={`you can add and switch account here`}
            tourKey={tourKey}
            borderRadius={10}>
            {keys[0] &&
              keys.map((item, index) => (
                <Account_Item
                  key={index}
                  user={item}
                  destination="Home"
                  setVisible={setModalvisible}
                />
              ))}
            {keys.length < 3 && (
              <Account_Item
                user={'add new account'}
                photo={Plus}
                New={true}
                destination="Home"
                setVisible={setModalvisible}
              />
            )}
          </TourGuideZone>
          <Space />
          <ProfileItems
            title={'Account Info'}
            image={AccountPic}
            func={() => navigation.navigate('My_Account')}
          />
          <ProfileItems
            title={'Referral Code'}
            image={Crown}
            func={() => navigation.navigate('Referral')}
          />
          <ProfileItems title={'NFT Showroom'} image={Crown} active={false} />
          <Space />
          <ProfileItems
            title={'General Setting'}
            image={SettingsPic}
            func={() => navigation.navigate('Settings')}
          />
          <ProfileItems
            title={'Change Password'}
            image={PasswordPic}
            func={() => navigation.navigate('Newpassword')}
          />
          <ProfileItems
            title={'PIN setting'}
            image={PIN}
            func={() => navigation.navigate('Create_PIN', {change: true})}
          />
          <Space />
          <ProfileItems
            title={'FAQs'}
            image={FAQPic}
            func={() => navigation.navigate('FAQ')}
          />
          <ProfileItems title={'Rate Us'} image={RatePic} />
          <ProfileItems
            title={'Contact Us'}
            image={Contact}
            func={() => setChat(true)}
          />
          <ProfileItems title={'Community'} image={Community} />
          <ProfileItems title={'News'} image={News} />
          <ProfileItems
            title={'Ads'}
            image={Ad}
            func={() => Linking.openURL('https://www.frodopay.io')}
          />
          <Space />
          {/* logout the current account */}
          <ProfileItems
            title={`Log out of ${data.username}`}
            image={Logout}
            func={async () => {
              setLoading(true);
              axiosConfig
                .get('/logout/')
                .then(() => (setLoading(false), logoutUser(data.username)))
                .catch(error => setLoading(false));
            }}
          />
        </ScrollView>

        <View style={{flex: 1}}></View>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

export default Profile;
