import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  RefreshControl,
  BackHandler,
  ToastAndroid,
  Linking,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {TourGuideZone, useTourGuideController} from 'rn-tourguide';

//services
import {GetProfile} from '../../services/api';
import {retrieveData, storeData} from '../../services/config';

//components
import Header from '../../components/Header';
import QuickSelect from '../../components/QuickSelect';
import AdSlider from '../../components/AdSlider';
import Footer from '../../components/Footer';
import Transactions from '../../components/Transactions';
import Loading from '../../components/Loading';
import {ModalMessage} from '../../components/ModalMessage';

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  let exitApp = 0;

  //Hardware backbutton function (double tap to exit)
  const backAction = () => {
    setTimeout(() => {
      exitApp = 0;
    }, 1000);

    if (exitApp === 0) {
      exitApp = 1;

      ToastAndroid.show('Tap another back to exit', ToastAndroid.SHORT);
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };

  const {canStart, start, eventEmitter} = useTourGuideController();

  //onstop function of tourguide
  const handleOnStop = () =>
    retrieveData('GUIDE').then(async value => {
      await storeData('GUIDE', {...value, Home: false});
    });

  // start the tourguide
  React.useEffect(() => {
    retrieveData('GUIDE').then(async value => {
      if (canStart && value.Home) {
        start();
      }
      eventEmitter.on('stop', handleOnStop);
      return () => {
        eventEmitter.off('stop', handleOnStop);
      };
    });
  }, [canStart]);

  //getting user data
  const GetProfileData = async () => {
    await GetProfile()
      .then(
        value => (setIsLoading(false), setIsSuccess(false), setIsSuccess(true)),
      )
      //handling errors
      .catch(
        error => (
          setVisible(true),
          setIsLoading(false),
          setIsSuccess(true),
          setError('Please check your connection , Try again.')
        ),
      );
  };

  //Deep Links user t Home screen
  //provide hardware backbutton press
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      //checks input links
      Linking.addEventListener('url', url => {
        //pushes to Home
        navigation.navigate('Home');
        const array = url.url.split('/');
        const Success = array.slice(-1)[0];
        JSON.parse(Success)
          ? //success deposit
            (setVisible(true), setError('Your transaction has been confirmed.'))
          : //failed deposit
            (setVisible(true),
            setError('Your transaction was not successful.'));
      });
      GetProfileData();
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );

  const onRefresh = React.useCallback(() => {
    setIsLoading(true);
    GetProfileData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading && <Loading />}
      <ModalMessage
        errormessage={error}
        visible={visible}
        setVisible={setVisible}
      />
      {isSuccess && (
        <View style={{alignItems: 'flex-end', flex: 1}}>
          <ScrollView
            style={{backgroundColor: '#fff'}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <TourGuideZone
              zone={1}
              text={'Wellcome to Frodopay tutorial, do you want to continue?'}
              borderRadius={16}
              keepTooltipPosition={false}>
              <Header />
              <QuickSelect navigation={navigation} />
            </TourGuideZone>
            <AdSlider />
            <Transactions />
          </ScrollView>
          <Footer navigation={navigation} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
