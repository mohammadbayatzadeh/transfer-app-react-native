import * as React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {useForm, FormProvider} from 'react-hook-form';

//services
import axios from 'axios';

//components
import Back from '../../components/buttons/Back';
import Name_Input from '../../components/inputs/Name_Input';
import {Button} from '../../components/buttons/Button';
import {ModalMessage} from '../../components/ModalMessage';
import Loading from '../../components/Loading';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {moderateScale, width} from '../../styles/scale';

const Recovery = ({navigation, route}) => {
  const [error, setError] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [loadingvisible, setLoadingVisible] = React.useState(false);

  const New = route.params;

  const formMethods = useForm();

  //posts username to server
  const onSubmit = form => {
    setLoadingVisible(true);
    axios
      .post(`${process.env.REACT_APP_URL}/forgot_pass/`, form, {
        timeout: 10000,
        timeoutErrorMessage:
          'Please check your internet connection, Try again. ',
      })
      .then(response => {
        navigation.navigate('Newpassword', {username: form.username});
        setLoadingVisible(false);
      })
      //handling errors
      .catch(error => {
        setLoadingVisible(false);
        setVisible(true);
        error.data
          ? setError(error.response.data)
          : setError('Please check your internet connection, Try again.');
        if (error.code === 'ERR_NETWORK') {
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
        <ScrollView>
          <Back
            navigation={navigation}
            dircetion="Signin"
            param={New && {New: true}}
          />
          <Text style={TextStyles.topText0}>Passsword Recovery</Text>
          <Text
            style={{...TextStyles.normal, marginVertical: moderateScale(20)}}>
            Enter your registered username below to receive password
            instructions
          </Text>
          <FormProvider {...formMethods}>
            <Name_Input
              name="username"
              error={formMethods.formState.errors}
              require={true}
            />
          </FormProvider>
        </ScrollView>
        <View style={{flex: 1}}></View>

        <Button
          func={formMethods.handleSubmit(onSubmit, onErrors)}
          title="Send me email"
          width={width - 50}
        />
      </View>
    </View>
  );
};

export default Recovery;
