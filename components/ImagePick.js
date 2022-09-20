import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import * as RootNavigation from '../RootNavigation';
import DocumentPicker from 'react-native-document-picker';

//services
import axios from 'axios';
import {retrieveData} from '../services/config';
import {REACT_APP_URL} from '@env';

//components
import Loading from '../components/Loading';
import {ModalMessage} from './ModalMessage';

//styles
import {styles} from '../styles/style';
import {ImageStyles} from '../styles/ImageStyles';

//images
const EditPic = require('../assets/icons/profile/edit_pic.png');

// to pick a Image from device storage used in edit account
const ImagePick = () => {
  const [error, setError] = React.useState('');
  const [nav, setNav] = React.useState('My_Account');
  const [visible, setVisible] = React.useState(false);
  const [loadingVisible, setLoadingVisible] = React.useState(false);

  //choosing image and sending to back
  const selectOneFile = async () => {
    //getting data nand create new formdata
    try {
      const res = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
      });

      const data = new FormData();

      data.append('file', {
        name: res.name,
        type: res.type,
        uri: Platform.OS === 'ios' ? res.uri.replace('file://', '') : res.uri,
      });
      setLoadingVisible(true);
      //sending image to back and getting response
      retrieveData('ACCESS').then(async value => {
        await axios
          .post(`${REACT_APP_URL}/profile/`, data, {
            timeout: 15000,
            timeoutErrorMessage:
              'Please check your internet connection, Try again. ',
            headers: {
              Authorization: `Bearer ${value}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(
            response => (
              setLoadingVisible(false),
              setVisible(true),
              setError('Image uploaded !'),
              setNav('Home')
            ),
          )
          .catch(
            error => (
              setVisible(true),
              setError('Check your internet connection !'),
              setLoadingVisible(false),
              setNav('My_Account')
            ),
          );
      });
    } catch (err) {
      setLoadingVisible(false);
      throw err;
    }
  };

  return (
    <TouchableOpacity style={styles.editPicContainer} onPress={selectOneFile}>
      <Image source={EditPic} style={ImageStyles.smallItemIcon} />
      <ModalMessage
        errormessage={error}
        visible={visible}
        setVisible={setVisible}
        func={() => (setVisible(false), RootNavigation.navigate(nav))}
      />
      <Loading visible={loadingVisible} />
    </TouchableOpacity>
  );
};

export default ImagePick;
