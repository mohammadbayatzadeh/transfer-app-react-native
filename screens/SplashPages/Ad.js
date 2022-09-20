import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  BackHandler,
} from 'react-native';

//services
import axios from 'axios';
import {REACT_APP_URL, REACT_APP_URL_MEDIA} from '@env';

//styles
import {styles} from '../../styles/style';
import {ImageStyles} from '../../styles/ImageStyles';

const Ad = ({navigation}) => {
  const [data, setData] = React.useState('');
  const [text, setText] = React.useState('');

  //exits the app with hardware back press
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      BackHandler.exitApp(),
    );
    return () => backHandler.remove();
  }, []);

  //getting banner data
  React.useEffect(() => {
    //gets banner
    axios
      .get(`${REACT_APP_URL}/advertise`, {
        timeout: 5000,
        timeoutErrorMessage:
          'Please check your internet connection, Try again. ',
      })
      .then(value => {
        setData(value.data);
        setTimeout(() => {
          //pushes to spalsh screen
          navigation.navigate('Splash');
        }, 4000);
      })
      //handling errors
      .catch(
        err => (
          setText('Internet connection error!'),
          setTimeout(() => {
            navigation.navigate('Splash');
          }, 4000)
        ),
      );
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => Linking.openURL(data.advertise.link)}>
        {data.advertise && (
          <Image
            source={{
              uri: `${REACT_APP_URL_MEDIA}${data.advertise.image}`,
            }}
            style={ImageStyles.successfullImage}
          />
        )}

        {text.length > 5 && <Text style={{color: 'black'}}>{text}</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default Ad;
