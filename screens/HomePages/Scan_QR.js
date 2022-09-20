import * as React from 'react';
import {Text, View, Image, ImageBackground, ScrollView} from 'react-native';
import {useForm, FormProvider} from 'react-hook-form';

//services
import axiosConfig from '../../services/config';

//components
import Back from '../../components/buttons/Back';
import {Scanqr} from '../../components/Scanqr';
import {OR} from '../../components/OR';
import Name_Input from '../../components/inputs/Name_Input';
import {ModalMessage} from '../../components/ModalMessage';
import Loading from '../../components/Loading';

//styles
import {styles} from '../../styles/style';
import {ImageStyles} from '../../styles/ImageStyles';
import {TextStyles} from '../../styles/TextStyles';
import {moderateScale, width} from '../../styles/scale';

//images
const Background = require('../../assets/icons/QR/QR_background.png');
const QR = require('../../assets/icons/QR/QR_code.png');

const Scan_QR = ({navigation}) => {
  const [scanModal, setScanModal] = React.useState(false);
  const [error, setError] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [loadingvisible, setLoadingVisible] = React.useState(false);

  const formMethods = useForm();

  //sends scanned qr link to server
  const onSubmit = form => {
    setLoadingVisible(true);
    //get data from server
    axiosConfig
      .get('/user/' + form.username)
      .then(response => {
        setLoadingVisible(false);
        //pushes to transfer screen
        navigation.navigate('Transfer', {
          data: response,
        });
      })
      //handling errors
      .catch(
        error => (
          setLoadingVisible(false), setVisible(true), setError('invalid user')
        ),
      );
  };

  return (
    <ImageBackground source={Background} style={{flex: 1}}>
      <ModalMessage
        errormessage={error}
        visible={visible}
        setVisible={setVisible}
      />
      <Loading visible={loadingvisible} />
      <View style={{...styles.QRContainer, paddingVertical: 15}}>
        <View style={styles.QRHeader}>
          <Back navigation={navigation} />
          <Text style={{...TextStyles.headerText, color: '#fff'}}>
            Scan QR Code
          </Text>
          <View style={{width: width / 10}}></View>
        </View>
        <ScrollView>
          <View style={{marginVertical: moderateScale(50)}}>
            <FormProvider {...formMethods}>
              <Name_Input
                label="Enter Username:"
                name="username"
                error={formMethods.formState.errors}
                type="QR"
                require={false}
                func={formMethods.handleSubmit(onSubmit)}
              />
            </FormProvider>
          </View>
          <OR />
          <View style={{alignItems: 'center'}}>
            <View style={styles.QRHolder}>
              <Image source={QR} style={ImageStyles.QR} />
            </View>
          </View>
        </ScrollView>
        <View style={{flex: 1}}></View>
        <Scanqr
          visible={scanModal}
          setvisible={setScanModal}
          navigation={navigation}
        />
      </View>
    </ImageBackground>
  );
};

export default Scan_QR;
