import * as React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {useForm, FormProvider} from 'react-hook-form';

//services
import Api from '../../services/api';
import {checkToken} from '../../services/config';

//components
import Name_Input from '../../components/inputs/Name_Input';
import Email_Input from '../../components/inputs/Email_Input';
import Password_Input from '../../components/inputs/Password_Input';
import {Button} from '../../components/buttons/Button';
import {ModalMessage} from '../../components/ModalMessage';
import {nullcheck} from '../../services/functions';
import Loading from '../../components/Loading';
import Country from '../../components/Country';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {width} from '../../styles/scale';

const SignUp = ({navigation, route}) => {
  const [loadingvisible, setLoadingVisible] = React.useState(false);
  const [choosenCountry, setChoosenCountry] = React.useState('');
  const [error, setError] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [user, setUser] = React.useState('');

  const New = route.params;

  const formMethods = useForm();

  //posts user data to server
  const onSubmit = async form => {
    setLoadingVisible(true);
    //create formdata
    const formData = {
      username: form.username,
      password: form.password,
      email: form.email,
      country: choosenCountry.id,
      referral: nullcheck(Object.values(form)[3]),
      device_type: Platform.OS,
      device_token: await checkToken(),
    };
    //post data
    Api('/register/', formData)
      .then(() => (setLoadingVisible(false), navigation.navigate('OTP')))
      //handling errors
      .catch(error => {
        setLoadingVisible(false);
        setVisible(true);
        if (error.data) {
          if (
            Object.keys(error.data)[0] === 'email' ||
            Object.keys(error.data)[0] === 'username'
          ) {
            setError(Object.values(error.data)[0]);
          } else {
            setError(error.data);
          }
        } else {
          setError('Please check your internet connection, Try again. ');
        }
      });
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
        <Loading visible={loadingvisible} />
        <ScrollView keyboardShouldPersistTaps="always">
          <Text style={TextStyles.topText}>
            Create a{' '}
            <Text style={{color: '#13ABB7', fontWeight: '900'}}>Frodopay</Text>{' '}
            account
          </Text>
          <FormProvider {...formMethods}>
            <Name_Input
              name="username"
              error={formMethods.formState.errors}
              require={true}
              setNewValue={setUser}
              user={user}
            />
            <Email_Input name="email" error={formMethods.formState.errors} />
            <Password_Input
              name="password"
              error={formMethods.formState.errors}
              confirm={false}
            />
            <Name_Input
              name="referral(optional)"
              error={formMethods.formState.errors}
              require={false}
            />
            <Country
              choosenCountry={choosenCountry}
              setChoosenCountry={setChoosenCountry}
            />
          </FormProvider>

          <Button
            title="Sign Up"
            func={formMethods.handleSubmit(onSubmit, onErrors)}
            width={width - 50}
          />
        </ScrollView>
        <View
          style={{
            justifyContent: 'flex-end',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text style={TextStyles.normal}>
            Already have an account?{'  '}
            <Text
              style={TextStyles.signup}
              onPress={() =>
                New
                  ? navigation.navigate('Signin', {New: true})
                  : navigation.navigate('Signin')
              }>
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
