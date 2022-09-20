import * as React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import * as RootNavigation from '../RootNavigation';

//services
import {retrieveData} from '../services/config';
import {changeAccount} from '../services/Switch_Account';
import {REACT_APP_URL_MEDIA} from '@env';

//styles
import {styles} from '../styles/style';
import {TextStyles} from '../styles/TextStyles';
import {ImageStyles} from '../styles/ImageStyles';

//images
const Vector = require('../assets/icons/login-signup/vectorDown.png');

//showing account items in ChangeAccountmodal
const Account_Item = ({user, photo, New = false, setVisible}) => {
  const [image, setImage] = React.useState('');

  //getting images data from selected user
  React.useEffect(() => {
    retrieveData('APP_DATA').then(value => {
      setImage(value[user].user.photo);
    });
  }, []);

  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => {
        //checks if account is for new one or not
        !New
          ? (changeAccount(user), setVisible(false))
          : RootNavigation.navigate('AuthApp', {
              screen: 'Signin',
              params: {New: true},
            });
      }}>
      <View style={styles.itemContainer}>
        {/* the item to add new account */}
        {!New ? (
          <Image
            source={{uri: `${REACT_APP_URL_MEDIA}${image}`}}
            style={ImageStyles.smallProfile}
          />
        ) : (
          <Image source={photo} style={ImageStyles.smallProfile} />
        )}

        <Text style={TextStyles.transName}>{user}</Text>
        <View style={{flex: 1}}></View>
        <Image
          source={Vector}
          style={{...ImageStyles.vector, transform: [{rotate: '-90deg'}]}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Account_Item;
