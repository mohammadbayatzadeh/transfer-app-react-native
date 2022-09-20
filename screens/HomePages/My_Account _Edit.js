import * as React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';
import {useFocusEffect} from '@react-navigation/native';

//services
import axiosConfig, {retrieveData} from '../../services/config';
import {nullcheck} from '../../services/functions';
import {findActive} from '../../services/Switch_Account';

//components
import Back from '../../components/buttons/Back';
import {Button} from '../../components/buttons/Button';
import Name_Input from '../../components/inputs/Name_Input';
import {ModalMessage} from '../../components/ModalMessage';
import {DatePick} from '../../components/dropdown/DatePick';
import DropdownComp from '../../components/dropdown/DropdownComp';
import Loading from '../../components/Loading';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {width} from '../../styles/scale';

const My_Account_Edit = ({navigation}) => {
  const [data, setData] = React.useState('');
  const [error, setError] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [nav, setNav] = React.useState('My_Account_Edit');
  const [birthday, setBirthday] = React.useState(null);
  const [dropdown, setDropdown] = React.useState('male');
  const [loadingVisible, setLoadingVisible] = React.useState(false);
  const genderData = [{label: 'male'}, {label: 'female'}];

  const formMethods = useForm();

  // getting active account data from storage and pust them in inputs
  useFocusEffect(
    React.useCallback(() => {
      findActive().then(username =>
        retrieveData('APP_DATA').then(value => {
          setData(value[username].user);
          setBirthday(value[username].user.birthday);
          //put data in appropiate inputs
          formMethods.setValue('First name', value[username].user.first_name);
          formMethods.setValue('Last name', value[username].user.last_name);
          formMethods.setValue(
            'Wallet address',
            value[username].user.wallet_address,
          );
          formMethods.setValue('Shop name', value[username].user.shop);
        }),
      );
    }, []),
  );

  //posts data to server
  const onSubmit = form => {
    setLoadingVisible(true);
    //convert birthday
    let Birthday = birthday
      ? `${new Date(birthday).getFullYear()}-${
          new Date(birthday).getMonth() + 1
        }-${new Date(birthday).getDate()}`
      : null;
    //create formdata
    const formData = {
      first_name: Object.values(form)[0],
      last_name: Object.values(form)[1],
      shop: nullcheck(Object.values(form)[2]),
      wallet_address: Object.values(form)[3],
      gender: dropdown,
      birthday: Birthday,
    };
    //send data
    axiosConfig
      .put('/profile/', formData)
      .then(response => {
        setLoadingVisible(false);
        setNav('Home');
        setVisible(true);
        setError('Your info updated');
      })
      //handling errors
      .catch(error => {
        setLoadingVisible(false);
        setNav('My_Account_Edit');
        setVisible(true);
        error.data
          ? setError(error.data)
          : setError('Please check your internet connection, Try again. ');
      });
  };

  const onErrors = errors => {};

  return (
    <View style={{...styles.QRContainer, backgroundColor: '#fff'}}>
      <View style={styles.content}>
        <Loading visible={loadingVisible} />
        <ModalMessage
          errormessage={error}
          visible={visible}
          setVisible={setVisible}
          func={() => (setVisible(false), navigation.navigate(nav))}
        />
        <View style={styles.QRHeader}>
          <Back navigation={navigation} dircetion="Profile" />
          <Text style={{...TextStyles.headerText, color: 'black'}}>
            Edit Account
          </Text>
          <View style={{width: width / 10}}></View>
        </View>
        <ScrollView keyboardShouldPersistTaps="always">
          <FormProvider {...formMethods}>
            <Name_Input
              label="First name :"
              name="First name"
              defaultValue={data.first_name}
              error={formMethods.formState.errors}
              require={true}
            />
            <Name_Input
              label="Last name :"
              name="Last name"
              defaultValue={data.last_name}
              error={formMethods.formState.errors}
              require={true}
            />
            <Name_Input
              label="Shop name :"
              name="Shop name"
              defaultValue={data.shop}
              error={formMethods.formState.errors}
            />
            <Name_Input
              name="Wallet address"
              label="Wallet address(BEP20) :"
              defaultValue={data.wallet_address}
              error={formMethods.formState.errors}
              require={true}
            />
            <View style={styles.details}>
              <DatePick birthday={birthday} setBirthday={setBirthday} />
              <DropdownComp
                dropdown={dropdown}
                setDropdown={setDropdown}
                data={genderData}
              />
            </View>
          </FormProvider>
        </ScrollView>
        <View style={{flex: 1}}></View>
        <Button
          title="Save"
          width={width - 50}
          func={formMethods.handleSubmit(onSubmit, onErrors)}
        />
      </View>
    </View>
  );
};

export default My_Account_Edit;
