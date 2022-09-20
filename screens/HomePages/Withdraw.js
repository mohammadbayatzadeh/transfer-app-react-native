import * as React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';
import * as RootNavigation from '../../RootNavigation';
import {useFocusEffect} from '@react-navigation/native';

//services
import Api from '../../services/api';
import {findActive} from '../../services/Switch_Account';
import {nullcheck} from '../../services/functions';
import {retrieveData} from '../../services/config';

//components
import Back from '../../components/buttons/Back';
import {Button} from '../../components/buttons/Button';
import Number_Input from '../../components/inputs/Number_Input';
import Des_Input from '../../components/inputs/Des_Input';
import {ModalMessage} from '../../components/ModalMessage';
import TransferDetail from '../../components/TransferDetail';
import AmountButton from '../../components/buttons/AmountButton';
import Loading from '../../components/Loading';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {width} from '../../styles/scale';

const Withdraw = ({navigation}) => {
  const [error, setError] = React.useState('');
  const [nav, setNav] = React.useState('Withdraw');
  const [visible, setVisible] = React.useState(false);
  const [response, setresponse] = React.useState('');
  const [responseVisible, setResponseVisible] = React.useState(false);
  const [data, setData] = React.useState('');
  const [loadingvisible, setLoadingVisible] = React.useState(false);

  //getting active account data
  useFocusEffect(
    React.useCallback(() => {
      findActive().then(username =>
        retrieveData('APP_DATA').then(value => {
          //setState them
          setData(value[username].user);
        }),
      );
    }, []),
  );

  const formMethods = useForm();

  //posts user withdraw to server
  const onSubmit = form => {
    setLoadingVisible(true);
    //create new formdata
    const formData = {
      amount: +form.amount,
      description: nullcheck(form.Description),
    };
    //post data to server
    Api('/withdrawal_req', formData)
      .then(response => {
        setLoadingVisible(false);
        setNav('Home');
        setresponse(response);
        setResponseVisible(true);
      })
      //handling errors
      .catch(error => {
        setLoadingVisible(false);
        setNav('Withdraw');
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
        <ModalMessage
          errormessage={error}
          visible={visible}
          setVisible={setVisible}
          func={() => (setVisible(false), RootNavigation.navigate(nav))}
        />
        <Loading visible={loadingvisible} />
        <TransferDetail
          confirmVisible={responseVisible}
          title="Pending Withdraw"
          text="You will have to wait for your request to be approved by the admin"
          user="FrodoPay"
          transferDetail={response}
          destination={response.wallet_address}
          id={response.withdrawal_id}
          backFunc={'nothing'}
          buttonText="Ok, Thanks!"
          func={() => {
            setResponseVisible(false);
            RootNavigation.navigate(nav);
          }}
        />
        <View style={styles.QRHeader}>
          <Back navigation={navigation} />
          <Text style={{...TextStyles.headerText, color: 'black'}}>
            Withdraw
          </Text>
          <View style={{width: width / 10}}></View>
        </View>
        <ScrollView>
          <View style={{...styles.details, paddingVertical: 15}}>
            <Text style={TextStyles.cancel}>Available balance : </Text>
            <Text style={TextStyles.profileTitle}>${data.inventory}</Text>
          </View>
          <View style={{...styles.details, paddingVertical: 15}}>
            <Text style={TextStyles.cancel}>Daily ceiling remains : </Text>
            <Text style={TextStyles.profileTitle}>
              ${data.daily_withdraw_ceiling_remains}
            </Text>
          </View>
          <View style={{...styles.details, paddingVertical: 15}}>
            <Text style={TextStyles.cancel}>Monthly ceiling remains : </Text>
            <Text style={TextStyles.profileTitle}>
              ${data.monthly_withdraw_ceiling_remains}
            </Text>
          </View>
          <FormProvider {...formMethods}>
            <View style={styles.transferDetailsContainer}>
              <View style={styles.details}>
                <Text style={TextStyles.text}>Enter amount:</Text>
                <Text style={TextStyles.text}>
                  Gas fee ${data.withdrawal_fee}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <Number_Input
                  name="amount"
                  border={true}
                  styletype="border"
                  error={formMethods.formState.errors}
                  min={5}
                />
              </View>
            </View>
            <View style={styles.details}>
              <View style={styles.transDetails}>
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
            </View>
            <Des_Input
              name="Description"
              error={formMethods.formState.errors}
            />
          </FormProvider>
        </ScrollView>
        <View style={{flex: 1}}></View>
        <Button
          title="Withdraw"
          width={width - 50}
          func={formMethods.handleSubmit(onSubmit, onErrors)}
        />
      </View>
    </View>
  );
};

export default Withdraw;
