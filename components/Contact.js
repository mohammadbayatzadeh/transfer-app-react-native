import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

//services
import axiosConfig from '../services/config';
import {REACT_APP_URL_MEDIA} from '@env';

//components
import {ModalMessage} from './ModalMessage';
import Loading from './Loading';

//styles
import {TextStyles} from '../styles/TextStyles';
import {styles} from '../styles/style';
import {ImageStyles} from '../styles/ImageStyles';
import {moderateScale} from '../styles/scale';

//contact items used  in Contact screen
const Contact = props => {
  const [error, setError] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [loadingvisible, setLoadingVisible] = React.useState(false);

  //contact touchHandler for pushing user to transfer screen
  const transfer = () => {
    if (!props.data.deactive) {
      setLoadingVisible(true);
      //get contact informations
      axiosConfig
        .get('/user/' + props.data.username)
        .then(response => {
          //pushes to transfer screen
          setLoadingVisible(false);
          props.navigation.navigate('Transfer', {
            data: response,
          });
        })
        //handling errors
        .catch(
          error => (
            setLoadingVisible(false),
            setVisible(true),
            setError('Please check your internet connection, Try again. ')
          ),
        );
    }
  };
  return (
    <TouchableOpacity
      style={{justifyContent: 'center', alignItems: 'center'}}
      onPress={() => !props.data.score && !props.data.country && transfer()}>
      <ModalMessage
        errormessage={error}
        visible={visible}
        setVisible={setVisible}
      />
      <Loading visible={loadingvisible} />

      <View style={styles.itemContainer}>
        <Image
          source={
            props.data.deactive
              ? props.data.photo
              : {uri: `${REACT_APP_URL_MEDIA}${props.data.photo}`}
          }
          style={ImageStyles.normalProfile}
        />
        <View style={{marginLeft: moderateScale(10)}}>
          <Text style={TextStyles.cancel}>{props.data.username}</Text>
          <Text style={TextStyles.text}>
            {!props.data.score
              ? `${props.data.first_name} ${props.data.last_name}`
              : `Score: ${props.data.score}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Contact;
