import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  BackHandler,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

//services
import {retrieveData} from '../../services/config';
import {findActive} from '../../services/Switch_Account';

//components
import Footer from '../../components/Footer';
import Contact from '../../components/Contact';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {ImageStyles} from '../../styles/ImageStyles';
import {width} from '../../styles/scale';
import {moderateScale} from '../../styles/scale';
import {modalStyles} from '../../styles/modalStyles';

//images
const Search = require('../../assets/icons/login-signup/search.png');

const Contacts = ({navigation}) => {
  const [search, setSearch] = React.useState('');
  const [contacts, setContacts] = React.useState('');

  let searchedContact = null;

  //getting contact list of active account from storage
  //provide hardware backbutton press
  useFocusEffect(
    React.useCallback(() => {
      findActive().then(username =>
        retrieveData('APP_DATA').then(value => {
          value[username].contacts
            ? setContacts(value[username].contacts)
            : setContacts([]);
        }),
      );
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );
      return () => backHandler.remove();
    }, []),
  );

  {
    !!contacts &&
      (searchedContact = contacts.filter(contact =>
        contact.username.toLowerCase().includes(search),
      ));
  }
  //sort list by alphabet
  {
    contacts.length &&
      searchedContact.sort((a, b) => {
        let fa = a.username.toLowerCase(),
          fb = b.username.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
  }
  return (
    <View style={{...styles.QRContainer, backgroundColor: '#fff'}}>
      <View style={styles.content}>
        <View style={styles.QRHeader}>
          <View style={{width: width / 10}}></View>
          <Text style={{...TextStyles.headerText, color: 'black'}}>
            Contacts
          </Text>
          <View style={{width: width / 10}}></View>
        </View>
        <ScrollView>
          <View
            style={{
              flex: 1,
              width: width - 50,
              marginTop: moderateScale(20),
              marginBottom: moderateScale(10),
            }}>
            <View style={modalStyles.searchBox}>
              <Image source={Search} style={ImageStyles.searchImage} />
              <TextInput
                placeholder="search username"
                placeholderTextColor="#013335"
                value={search}
                style={modalStyles.searchInput}
                onChangeText={value => setSearch(value)}
              />
            </View>
          </View>

          <Text
            style={{
              ...TextStyles.headerText,
              marginBottom: moderateScale(15),
              color: '#013335',
            }}>
            All Contacts
          </Text>

          {contacts.length ? (
            searchedContact.length > 0 ? (
              searchedContact.map(item => (
                <Contact key={item.id} data={item} navigation={navigation} />
              ))
            ) : (
              <Text style={{color: '#013335'}}>Nothing found...</Text>
            )
          ) : (
            <Text style={{color: '#013335'}}>Nothing found...</Text>
          )}
        </ScrollView>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

export default Contacts;
