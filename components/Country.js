import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import * as RootNavigation from '../RootNavigation';

//services
import axios from 'axios';
import {REACT_APP_URL_MEDIA, REACT_APP_URL} from '@env';

//components
import CountryItem from './CountryItem';
import {ModalMessage} from './ModalMessage';

//images
const Search = require('../assets/icons/login-signup/search.png');

//styles
import {styles} from '../styles/style';
import {modalStyles} from '../styles/modalStyles';
import {TextStyles} from '../styles/TextStyles';
import {ImageStyles} from '../styles/ImageStyles';
import {moderateScale} from '../styles/scale';

//show country list
const Country = ({choosenCountry, setChoosenCountry}) => {
  const [visible, setVisible] = React.useState(false);
  const [countryData, setCountryData] = React.useState();
  const [search, setSearch] = React.useState('');
  const [error, setError] = React.useState('');
  const [loadingvisible, setLoadingVisible] = React.useState(false);

  let searchedCountry = null;

  //get list from server and lists them
  React.useEffect(() => {
    const fetchAPI = async () => {
      //getting data
      await axios
        .get(`${REACT_APP_URL}/countries/`,{
          timeout: 5000,
          timeoutErrorMessage:
            'Please check your internet connection, Try again. ',
        })
        .then(async value => {
          //setState all data
          //one for selected country
          setCountryData(value.data);
          setChoosenCountry(value.data[0]);
        })
        //handling errors
        .catch(
          error => (
            setLoadingVisible(true),
            setError('Please check your internet connection, Try again.')
          ),
        );
    };

    fetchAPI();
  }, []);

  //lowerCase the searched country
  const searchHandler = value => {
    setSearch(value.toLowerCase());
  };
  //change the country list to searched country list
  {
    !!countryData &&
      (searchedCountry = countryData.filter(country =>
        country.name.toLowerCase().includes(search),
      ));
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {!!choosenCountry ? (
          <CountryItem
            name={choosenCountry.name}
            image={`${REACT_APP_URL_MEDIA}${choosenCountry.flag}`}
            visible={visible}
            setvisible={setVisible}
            choosen={choosenCountry}
          />
        ) : (
          <Text style={TextStyles.normal}>Please wait ... </Text>
        )}
        <ModalMessage
          errormessage={error}
          visible={loadingvisible}
          setVisible={setLoadingVisible}
          func={() => (setVisible(false), RootNavigation.navigate('Signin'))}
        />
        <Modal animationType="slide" transparent={true} visible={visible}>
          <TouchableOpacity
            style={modalStyles.modalContainer}
            onPress={() => setVisible(false)}>
            <TouchableOpacity
              style={{...modalStyles.modal, height: '70%'}}
              activeOpacity={1}>
              <View
                style={{
                  ...styles.details,
                  marginBottom: moderateScale(10),
                }}>
                <View style={modalStyles.searchBox}>
                  <Image source={Search} style={ImageStyles.searchImage} />
                  <TextInput
                    placeholder="search"
                    placeholderTextColor="#013335"
                    value={search}
                    onChangeText={searchHandler}
                    style={modalStyles.searchInput}
                  />
                </View>
                <Text
                  style={TextStyles.cancel}
                  onPress={() => setVisible(false)}>
                  Cancel
                </Text>
              </View>
              <ScrollView>
                {!!countryData
                  ? searchedCountry.map(item => (
                      <CountryItem
                        name={item.name}
                        abbreviation={item.abbreviation}
                        image={`${process.env.REACT_APP_URL_MEDIA}${item.flag}`}
                        key={item.id}
                        setchoosen={setChoosenCountry}
                        setvisible={setVisible}
                        choosen={choosenCountry}
                        data={item}
                      />
                    ))
                  : ''}
              </ScrollView>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

export default Country;
