import * as React from 'react';
import {Text, View, ScrollView, Linking} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';

//services
import Api from '../../services/api';
import {findActive} from '../../services/Switch_Account';
import axiosConfig, {retrieveData} from '../../services/config';

//components
import Back from '../../components/buttons/Back';
import {Button} from '../../components/buttons/Button';
import Number_Input from '../../components/inputs/Number_Input';
import AmountButton from '../../components/buttons/AmountButton';
import DropdownComp from '../../components/dropdown/DropdownComp';
import {ModalMessage} from '../../components/ModalMessage';
import Loading from '../../components/Loading';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {width} from '../../styles/scale';
import {moderateScale} from '../../styles/scale';

const Deposit = ({navigation}) => {
  const [dropdown, setDropdown] = React.useState('BEP20');
  const [loadingvisible, setLoadingvisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState('');
  const drowDown = [
    {label: 'BEP20', value: 'BEP20'},
    {label: 'ERC20', value: 'ERC20'},
  ];

  const formMethods = useForm();

  //pushes the user to browser to complete Deposit
  const onSubmit = async form => {
    //get active account info
    setLoadingvisible(true);
    //get username data and  id
    await findActive().then(async username => {
      await retrieveData('APP_DATA').then(async value => {
        axiosConfig.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${value[username].token.access}`;
        //create new formdata
        const formData = {
          user: value[username].user.id,
          amount: `${+form.amount}`,
          token: 'BUSD',
          network: dropdown,
        };
        //post data to server and get deposit id
        await Api('/deposit_hash', formData)
          .then(response => {
            setLoadingvisible(false);
            Linking.openURL(
              `https://frodopay.io/deposit?depositId=${response.deposit_id}`,
            );
          })
          .catch(err => {
            setVisible(true);
            setLoadingvisible(false);
            err.data
              ? setError(err.data)
              : setError('Please check your internet connection, Try again. ');
          });
      });
    });
  };

  const onErrors = errors => {};

  return (
    <View style={{...styles.QRContainer, backgroundColor: '#fff'}}>
      <View style={styles.content}>
        <View style={styles.QRHeader}>
          <Back navigation={navigation} />
          <Text style={{...TextStyles.headerText, color: 'black'}}>
            Deposit
          </Text>
          <View style={{width: width / 10}}></View>
          <Loading visible={loadingvisible} />
          <ModalMessage
            errormessage={error}
            visible={visible}
            setVisible={setVisible}
          />
        </View>
        <ScrollView>
          <View style={{margin: moderateScale(25)}}></View>
          <FormProvider {...formMethods}>
            <Number_Input
              name="amount"
              styletype="big"
              error={formMethods.formState.errors}
              min={5}
            />
            <Text
              style={{...TextStyles.cancel, paddingBottom: moderateScale(10)}}>
              Currently, we accept BUSD only.
            </Text>
            <View
              style={{
                ...styles.transDetails,
                paddingVertical: moderateScale(10),
              }}>
              <AmountButton
                amount={1500}
                func={() => formMethods.setValue('amount', '1500')}
              />
              <AmountButton
                amount={3000}
                func={() => formMethods.setValue('amount', '3000')}
              />
              <AmountButton
                amount={6000}
                func={() => formMethods.setValue('amount', '6000')}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Text
                style={{
                  ...TextStyles.cancel,
                  paddingBottom: moderateScale(10),
                  paddingRight: moderateScale(10),
                }}>
                Network:
              </Text>
              <DropdownComp
                dropdown={dropdown}
                setDropdown={setDropdown}
                data={drowDown}
                large={true}
              />
            </View>
          </FormProvider>
        </ScrollView>
        <View style={{flex: 1}}></View>
        <Button
          title="Deposit"
          width={width - 50}
          func={formMethods.handleSubmit(onSubmit, onErrors)}
        />
      </View>
    </View>
  );
};

export default Deposit;
