import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNDisableBatteryOptimizationsAndroid from 'react-native-disable-battery-optimizations-android';
import {Alert} from 'react-native';
import notifee, {AndroidColor, AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

//services
import {retrieveData} from '../../services/config';

//components (Stacks)
import AuthApp from './AuthApp';
import HomeApp from './HomeApp';
import SplashApp from './SplashApp';

// Root Stack
const MainApp = createNativeStackNavigator();

//checking to turn off battery optimization
RNDisableBatteryOptimizationsAndroid.isBatteryOptimizationEnabled().then(
  async isEnabled => {
    await retrieveData('FIRSTTIME').then(value => {
      if (value === undefined) {
        if (isEnabled) {
          Alert.alert(
            'Optimization Alert ',
            ' Disable battery optimization to better app performance.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: async () => {
                  try {
                    RNDisableBatteryOptimizationsAndroid.openBatteryModal();
                  } catch (err) {}
                },
              },
            ],
          );
        }
      }
    });
  },
);

//shows notifications with notifee
const onMessageReceived = async message => {
  await notifee.requestPermission();
  await retrieveData(`${message.data.type}`).then(async value => {
    const channelId = await notifee.createChannel({
      id: message.messageId,
      name: message.messageId,
      vibration: true,
      importance: value ? AndroidImportance.HIGH : AndroidImportance.NONE,
      vibrationPattern: [200, 500],
      lights: true,
      sound: 'notification',
      lightColor: AndroidColor.GREEN,
    });
    await notifee.displayNotification({
      title: message.data.title,
      body: `${message.data.username}: ${message.data.body}`,
      android: {
        channelId,
        vibrationPattern: [200, 500],
        pressAction: {
          id: 'default',
        },
      },
    });
  });
};

//gets notifications in different app status
messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

const Main = () => {
  return (
    <MainApp.Navigator
      initialRouteName="SplashApp"
      screenOptions={{headerShown: false}}>
      <MainApp.Screen name="SplashApp" component={SplashApp} />
      <MainApp.Screen name="AuthApp" component={AuthApp} />
      <MainApp.Screen name="HomeApp" component={HomeApp} />
    </MainApp.Navigator>
  );
};

export default Main;
