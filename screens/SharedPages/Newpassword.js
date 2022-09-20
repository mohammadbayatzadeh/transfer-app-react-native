import * as React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {useForm, FormProvider} from 'react-hook-form';

//services
import Api from '../../services/api';

//components
import Back from '../../components/buttons/Back';
import Password_Input from '../../components/inputs/Password_Input';
import {Button} from '../../components/buttons/Button';
import {ModalMessage} from '../../components/ModalMessage';
import Loading from '../../components/Loading';
import OneNum_Input from '../../components/inputs/OneNum_Input';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {moderateScale, width} from '../../styles/scale';

const Newpassword = ({navigation, route}) => {
  const formMethods = useForm();
  const [error, setError] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [nav, setNave] = React.useState('');
  const [loadingvisible, setLoadingVisible] = React.useState(false);

  const username = route.params;

  //post new password and code server
  const onSubmit = form => {
    const formData = username
      ? //check have code ro not
        {
          username: username.username,
          code: value,
          newpass: form.Password,
        }
      : {
          new_password1: form.Password,
          new_password2: form.Confirm_Password,
        };
    //validation when have code
    username
      ? value.length === 5 &&
        (setLoadingVisible(true),
        //post data
        Api('/forgot_pass_conf/', formData)
          .then(response => {
            setLoadingVisible(false);
            setVisible(true);
            setError(response);
            setNave('Signin');
          })
          //handling errors
          .catch(
            error => (
              setVisible(true),
              error.data
                ? setError(error.data)
                : setError(
                    'Please check your internet connection, Try again. ',
                  ),
              setLoadingVisible(false)
            ),
          ))
      : //not have code
        (setLoadingVisible(true),
        Api('/rest-auth/password/change/', formData)
          .then(response => {
            setVisible(true);
            setLoadingVisible(false);
            setError(response.detail);
            setNave('Home');
          })
          //handling errors
          .catch(
            error => (
              setVisible(true),
              setLoadingVisible(false),
              error.data
                ? setError(Object.values(error.data)[0])
                : setError('Please check your internet connection, Try again. ')
            ),
          ));
  };

  const onErrors = errors => {};

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ModalMessage
          errormessage={error}
          visible={visible}
          setVisible={setVisible}
          func={() => (setVisible(false), navigation.navigate(nav))}
        />
        <Loading visible={loadingvisible} />
        <ScrollView>
          <Back navigation={navigation} />
          <Text style={TextStyles.topText0}>Create New Password</Text>
          <Text
            style={{...TextStyles.normal, marginVertical: moderateScale(15)}}>
            Please, enter a new password below different from the previous
            password {username && 'and the code we sent to your email.'}
          </Text>
          <FormProvider {...formMethods}>
            <Password_Input
              name="Password"
              error={formMethods.formState.errors}
              confirm={true}
            />
            {username && (
              <View>
                <Text style={TextStyles.normal}>Code:</Text>
                <OneNum_Input value={value} setValue={setValue} />
              </View>
            )}
          </FormProvider>
        </ScrollView>

        <View style={{flex: 1}}></View>

        <Button
          func={formMethods.handleSubmit(onSubmit, onErrors)}
          title="Create new password"
          width={width - 50}
        />
      </View>
    </View>
  );
};

export default Newpassword;
