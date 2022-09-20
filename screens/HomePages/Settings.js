import * as React from 'react';
import {Text, View, ScrollView} from 'react-native';

//components
import Back from '../../components/buttons/Back';
import ProfileItems from '../../components/ProfileItems';
import Space from '../../components/Space';
import SettingsItem from '../../components/SettingItem';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {width} from '../../styles/scale';

const Settings = ({navigation}) => {
  return (
    <View style={{...styles.QRContainer, backgroundColor: '#fff'}}>
      <View style={styles.content}>
        <View style={styles.QRHeader}>
          <Back navigation={navigation} />
          <Text style={{...TextStyles.headerText, color: 'black'}}>
            General Setting
          </Text>
          <View style={{width: width / 10}}></View>
        </View>
        
        <ScrollView>
          <ProfileItems title={'Terms and Conditions'}  func={()=>navigation.navigate('Terms')} />
          <ProfileItems title={'Privacy Policy'} />
          <Space />
          <SettingsItem title="Default Notification Actions" name="DEFAULT" />
          <SettingsItem title="Transfer Notification " name="TRANSFER" />
          <SettingsItem title="Deposit Notifications" name="DEPOSIT" />
          <SettingsItem title="Withdrawal Notifications" name="WITHDRAWAL" />
        </ScrollView>
      </View>
    </View>
  );
};

export default Settings;
