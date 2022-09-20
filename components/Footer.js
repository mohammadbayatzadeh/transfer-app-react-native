import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import * as RootNavigation from '../RootNavigation';

//images
const Contacts = require('../assets/icons/contacts.png');
const Contacts_Active = require('../assets/icons/contacts_Active.png');
const Activity = require('../assets/icons/Activity.png');
const Activity_Active = require('../assets/icons/Activity_Active.png');
const Profile = require('../assets/icons/Profile.png');
const Profile_Active = require('../assets/icons/Profile_Active.png');
const Home = require('../assets/icons/Home.png');
const Home_Active = require('../assets/icons/Home_Active.png');
const Scan = require('../assets/icons/scan.png');

// styles
import {TextStyles} from '../styles/TextStyles';
import {ImageStyles} from '../styles/ImageStyles';
import {styles} from '../styles/style';

//Footer item
const Item = ({name, image, active}) => {
  //getting the route name 
  const route = useRoute();
  return (
    <TouchableOpacity
      style={styles.footerItem}
      onPress={() => {
        RootNavigation.navigate(name);
      }}>
      <View>
        <Image
          source={route.name === name ? active : image}
          style={ImageStyles.itemIcon}
        />
      </View>
      <Text style={TextStyles.itemText}>{name}</Text>
    </TouchableOpacity>
  );
};

//Footer (bottom navbar) used in Home, Contacts, Activity and Profile screens
const Footer = props => {
  return (
    <View style={styles.body}>
      <View style={styles.footer}>
        <Item name="Home" active={Home_Active} image={Home} />
        <Item name="Contacts" active={Contacts_Active} image={Contacts} />
        <TouchableOpacity
          style={styles.scan}
          onPress={() => {
            props.navigation.navigate('Scan_QR');
          }}>
          <Image source={Scan} style={ImageStyles.itemIcon} />
        </TouchableOpacity>
        <Item name="Activity" active={Activity_Active} image={Activity} />
        <Item name="Profile" active={Profile_Active} image={Profile} />
      </View>
    </View>
  );
};

export default Footer;
