import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {REACT_APP_URL} from '@env';

//services
import axios from 'axios';
import {Activition, saveAppData} from './Switch_Account';

//sets base url
const axiosConfig = axios.create({
  baseURL: REACT_APP_URL,
});

//sets timeout
axiosConfig.defaults.timeout = 10000;
axiosConfig.defaults.timeoutErrorMessage =
  'Please check your internet connection, Try again. ';

//store data to storage(with AsyncStorage)
export const storeData = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(value));
    return value;
  } catch (error) {}
};

//remove data from storage(with AsyncStorage)
export const RemoveData = async (name, value) => {
  try {
    await AsyncStorage.removeItem(name);
    return value;
  } catch (error) {}
};

//retrieve data from storage(with AsyncStorage)
export const retrieveData = async name => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {}
};

//gets token devices from firebase
export const checkToken = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      return fcmToken;
    }
  } catch (error) {}
};

//sets axios config headers
axiosConfig.defaults.headers.common.accept = 'application/json';
axiosConfig.defaults.headers.common['Content-Type'] = 'application/json';

//request configs
axiosConfig.interceptors.request.use(
  async config => {
    return config;
  },
  //request error configs
  error => {
    return Promise.reject(error.request);
  },
);

//response configs
axiosConfig.interceptors.response.use(
  async response => {
    if (!!response.data.token) {
      //save data from register , login response
      if (response.data.user.login) {
        //active the new added account
        await Activition(response.data.user.username);
        await storeData('LOGGEDIN', true);
        await saveAppData({
          ...response.data,
          transactions: {},
        });
      }
      //sets new token in header
      await storeData('REFRESH', response.data.token.refresh);
      await storeData('ACCESS', response.data.token.access).then(
        value =>
          (axiosConfig.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${value}`),
      );
    }
    return response.data;
  },
  //response errors config
  error => {
    if (error.code === 'ERR_NETWORK' || error.response.status === 401) {
      return Promise.reject({
        data: 'Please check your internet connection, Try again. ',
      });
    }
    return Promise.reject(error.response);
  },
);

export default axiosConfig;
