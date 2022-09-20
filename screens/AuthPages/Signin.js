import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  Platform,
} from 'react-native';
import {useForm, FormProvider} from 'react-hook-form';
import {useFocusEffect} from '@react-navigation/native';

//services
import Api from '../../services/api';
import {checkToken, retrieveData} from '../../services/config';

//components
import Name_Input from '../../components/inputs/Name_Input';
import Password_Input from '../../components/inputs/Password_Input';
import {Button} from '../../components/buttons/Button';
import {ModalMessage} from '../../components/ModalMessage';
import Loading from '../../components/Loading';
import Back from '../../components/buttons/Back';
import ChangeAccountmodal from '../../components/ChangeAccountmodal';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {moderateScale, width} from '../../styles/scale';
import {ButtonStyles} from '../../styles/ButtonStyles';

//images
const Swap = require('../../assets/icons/modal/Swap.png');

const SignIn = ({navigation, route}) => {
  const [error, setError] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [loadingvisible, setLoadingVisible] = React.useState(false);
  const [data, setData] = React.useState('');
  const [modalvisible, setModalvisible] = React.useState(false);
  const [keys, setKeys] = React.useState('');

  const New = route.params;

  const formMethods = useForm();

  //getting account data to count accounts
  useFocusEffect(
    React.useCallback(() => {
      retrieveData('APP_DATA').then(async data => {
        setData(data);
        setKeys(Object.keys(data));
      });
      //provides hardware backbutton press
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );
      return () => backHandler.remove();
    }, []),
  );

  //posts data to server
  const onSubmit = async form => {
    setLoadingVisible(true);
    //craete new formdata
    const formData = await {
      ...form,
      device_type: Platform.OS,
      device_token: await checkToken(),
    };
    console.log(formData);
    //post data
    await Api('/login/', formData)
      .then(async response => {
        setLoadingVisible(false);
        //pushes to OTP
        navigation.navigate('OTP');
      })
      //handling errors
      .catch(
        error => (
          setVisible(true),
          error.data
            ? setError(error.data)
            : setError('Please check your internet connection, Try again. '),
          setLoadingVisible(false)
        ),
      );
  };

  const onErrors = errors => {};

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ModalMessage
          errormessage={error}
          visible={visible}
          setVisible={setVisible}
        />
        <ChangeAccountmodal
          visible={modalvisible}
          setVisible={setModalvisible}
          data={data}
        />
        <Loading visible={loadingvisible} />
        <ScrollView keyboardShouldPersistTaps="always">
          {New ? (
            <Back
              navigation={navigation}
              direction="HomeApp"
              screen="Profile"
            />
          ) : (
            keys.length > 0 && (
              <TouchableOpacity
                style={ButtonStyles.iconContainer}
                onPress={() => setModalvisible(true)}>
                <Image source={Swap} style={ButtonStyles.backIcon} />
              </TouchableOpacity>
            )
          )}

          <Text style={TextStyles.topText0}>Hi There!</Text>
          <Text
            style={{...TextStyles.normal, marginVertical: moderateScale(15)}}>
            Welcome back, Sign in to your account
          </Text>
          <FormProvider {...formMethods}>
            <Name_Input
              name="username"
              error={formMethods.formState.errors}
              require={true}
            />
            <Password_Input
              name="password"
              error={formMethods.formState.errors}
              confirm={false}
            />
          </FormProvider>
          <TouchableOpacity
            onPress={() =>
              New
                ? navigation.navigate('Recovery', {New: true})
                : navigation.navigate('Recovery')
            }>
            <Text style={TextStyles.forget}>Forgot Password?</Text>
          </TouchableOpacity>
          <Button
            func={formMethods.handleSubmit(onSubmit, onErrors)}
            title="Sign In"
            width={width - 50}
          />
        </ScrollView>
        <View style={{flex: 1}}></View>
        <View
          style={{
            justifyContent: 'flex-end',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text style={TextStyles.normal}>
            Don’t have an account?{'  '}
            <Text
              style={TextStyles.signup}
              onPress={() =>
                New
                  ? navigation.navigate('AuthApp', {
                      screen: 'Signup',
                      params: {New: true},
                    })
                  : navigation.navigate('AuthApp', {screen: 'Signup'})
              }>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
