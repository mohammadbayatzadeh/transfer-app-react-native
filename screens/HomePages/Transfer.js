import * as React from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {useForm, FormProvider} from 'react-hook-form';

//services
import Api from '../../services/api';
import {retrieveData} from '../../services/config';
import {findActive} from '../../services/Switch_Account';
import {REACT_APP_URL_MEDIA} from '@env';

//components
import Back from '../../components/buttons/Back';
import Number_Input from '../../components/inputs/Number_Input';
import {ModalMessage} from '../../components/ModalMessage';
import {Button} from '../../components/buttons/Button';
import TransferDetail from '../../components/TransferDetail';
import Loading from '../../components/Loading';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {ImageStyles} from '../../styles/ImageStyles';
import {moderateScale, width} from '../../styles/scale';

const Transfer = ({navigation, route}) => {
  const [transferDetail, setTransferDetail] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const [loadingvisible, setLoadingVisible] = React.useState(false);

  const userData = route.params;

  //getting active account user data
  React.useEffect(() => {
    findActive().then(username =>
      retrieveData('APP_DATA').then(value => {
        //setState them
        setData(value[username].user);
      }),
    );
  }, []);

  const formMethods = useForm();

  //send user transfer to server
  const onSubmit = form => {
    setLoadingVisible(true);
    setAmount(form.amount);
    //create formData
    const formData = {
      destination: userData.data.username,
      amount: +form.amount,
      description: '',
    };
    //post data for new transfer
    Api('/new_transfer', formData)
      .then(
        response => (
          setLoadingVisible(false),
          setConfirmVisible(true),
          setTransferDetail(response)
        ),
      )
      //handling errors
      .catch(
        error => (
          setLoadingVisible(false),
          setVisible(true),
          error.data
            ? setError(error.data)
            : setError('Please check your internet connection, Try again. ')
        ),
      );
  };

  const onErrors = errors => {};

  return (
    <View style={{...styles.QRContainer, backgroundColor: '#fff'}}>
      <View style={styles.content}>
        <ModalMessage
          errormessage={error}
          visible={visible}
          setVisible={setVisible}
        />
        <Loading visible={loadingvisible} />
        <ScrollView>
          <View style={{alignContent: 'center', alignItems: 'center'}}>
            <View style={{...styles.QRHeader, marginBottom: 50}}>
              <Back navigation={navigation} />
              <Text style={{...TextStyles.headerText, color: '#013335'}}>
                Send Money
              </Text>
              <View style={{width: width / 10}}></View>
            </View>
            <View style={styles.ProfileBorder}>
              <Image
                source={{uri: `${REACT_APP_URL_MEDIA}${userData.data.photo}`}}
                style={ImageStyles.largeProfile}
              />
            </View>
            <Text style={TextStyles.text}>
              To{'  '}
              <Text style={TextStyles.name}> {userData.data.username}</Text>
            </Text>
            <View style={styles.transferDetailsContainer}>
              <View
                style={{...styles.details, justifyContent: 'space-between'}}>
                <Text style={TextStyles.text}>Enter amount:</Text>
                <Text style={TextStyles.text}>Max ${data.inventory}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text
                  style={{...TextStyles.cancel, padding: moderateScale(10)}}>
                  BUSD:
                </Text>

                <FormProvider {...formMethods}>
                  <Number_Input
                    name="amount"
                    border={true}
                    error={formMethods.formState.errors}
                    styletype="border"
                    min={5}
                  />
                </FormProvider>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{flex: 1}}></View>
        <Button
          title="Send Money"
          func={formMethods.handleSubmit(onSubmit, onErrors)}
          width={width - 50}
        />
        <TransferDetail
          title={'Transfer Confirmation'}
          navigation={navigation}
          confirmVisible={confirmVisible}
          setConfirmVisible={setConfirmVisible}
          amount={amount}
          transferDetail={transferDetail}
          user={data.username}
          destination={transferDetail.destination}
          destinationData={userData.data}
        />
      </View>
    </View>
  );
};

export default Transfer;
