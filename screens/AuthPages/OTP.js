import * as React from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import * as RootNavigation from '../../RootNavigation';

//services
import Api from '../../services/api';
import axiosConfig, {retrieveData} from '../../services/config';

//components
import Back from '../../components/buttons/Back';
import {Button} from '../../components/buttons/Button';
import {ModalMessage} from '../../components/ModalMessage';
import OneNum_Input from '../../components/inputs/OneNum_Input';
import Loading from '../../components/Loading';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {moderateScale, width} from '../../styles/scale';

const OTP = ({navigation}) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [loadingvisible, setLoadingVisible] = React.useState(false);
  const [buttonEnable, setButtonEnable] = React.useState(true);

  // resend code timer
  const timer = () => {
    setInterval(() => {
      setButtonEnable(true);
    }, 60000);
  };

  //send code to server and get response
  const onSubmit = value => {
    setLoadingVisible(true);
    const form = {code: value};
    //post code to server
    Api('/confirmation/', form)
      .then(async () => {
        setLoadingVisible(false);
        await retrieveData('PIN').then(value => {
          //check if have pin code set
          value === 0
            ? RootNavigation.navigate('AuthApp', {screen: 'Create_PIN'})
            : navigation.navigate('HomeApp', {screen: 'Home'});
        });
      })
      //handling errors
      .catch(
        error => (
          setLoadingVisible(false),
          setVisible(true),
          error.data
            ? setError('OTP code invalid!')
            : setError('Please check your internet connection, Try again. ')
        ),
      );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ModalMessage
          errormessage={error}
          visible={visible}
          setVisible={setVisible}
        />
        <Loading visible={loadingvisible} />
        <ScrollView>
          <Back navigation={navigation} />
          <Text style={TextStyles.topText0}>Verify it’s you</Text>
          <Text
            style={{...TextStyles.normal, marginVertical: moderateScale(20)}}>
            We sent a code to your email. Enter it here to verify your identity
          </Text>
          <OneNum_Input value={value} setValue={setValue} />
          <Text style={styles.error}></Text>

          {/* resendCode functions */}
          <TouchableOpacity
            onPress={() => {
              if (buttonEnable) {
                timer();
                setButtonEnable(false);
                setLoadingVisible(true);
                axiosConfig
                  .get('/activation/')
                  .then(
                    value => (
                      setLoadingVisible(false),
                      setVisible(true),
                      setError(value)
                    ),
                  )
                  .catch(
                    error => (
                      setLoadingVisible(false),
                      setVisible(true),
                      setError('Request failed , please try again.')
                    ),
                  );
              }
            }}
            style={{justifyContent: 'flex-start', alignSelf: 'center'}}>
            <Text
              style={
                buttonEnable ? TextStyles.signup : TextStyles.signup_deactive
              }>
              Resend Code
            </Text>
          </TouchableOpacity>
          <View style={{justifyContent: 'flex-start', alignSelf: 'center'}}>
            {!buttonEnable && (
              <Text style={TextStyles.cancel}>Try again in 1 minute!</Text>
            )}
          </View>
        </ScrollView>
        <Text></Text>
        <View style={{flex: 1}}></View>

        <Button
          func={() => value.length === 5 && onSubmit(value)}
          title="Confirm"
          width={width - 50}
        />
      </View>
    </View>
  );
};

export default OTP;
