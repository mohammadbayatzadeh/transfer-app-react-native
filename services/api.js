import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../RootNavigation';

//services
import axios from 'axios';
import axiosConfig from './config';
import {retrieveData, storeData, RemoveData} from './config';
import {changenotif, findActive, saveAppData} from './Switch_Account';
import {isTokenExpired} from './credentials';
import {REACT_APP_URL} from '@env';

//axiosConfig post method function
const Api = (api, formData) => {
  return new Promise((resolve, reject) => {
    axiosConfig
      .post(api, formData)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        return reject(error);
      });
  });
};

//axiosConfig get method function
export const ApiGet = async api => {
  const response = await axiosConfig.get(api);
  return response.data;
};

//gets data from server
const saveNewData = async () => {
  //get data
  await axios
    .all([
      axiosConfig.get('/profile'),
      axiosConfig.get('/trans_history'),
      axiosConfig.get('/notif_list'),
    ])
    .then(async value => {
      //save user, transactions data
      await saveAppData({
        user: value[0],
        transactions: value[1],
      });
      //save notifications
      await changenotif(value[2]);
      return value;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

//gets user profile data
export const GetProfile = async () => {
  //find active account
  await findActive().then(async user => {
    //first, sets tokens
    //retrieve data (refresh and access)
    await retrieveData('APP_DATA').then(async Data => {
      await storeData('REFRESH', Data[user].token.refresh);
      await storeData('ACCESS', Data[user].token.access).then(
        async value =>
          (axiosConfig.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${value}`),
      );
      //checking tokens
      await AsyncStorage.multiGet(['ACCESS', 'REFRESH']).then(async value => {
        if (isTokenExpired(value[1][1])) {
          //refresh token expired
          //deleteing data and pushes to log in
          await RemoveData('ACCESS');
          await RemoveData('REFRESH');
          await storeData('LOGGEDIN', false);
          delete axiosConfig.defaults.headers.common.Authorization;
          RootNavigation.navigate('AuthApp', {screen: 'Signin'});
        } else {
          //refresh not expired
          //access expires
          if (isTokenExpired(value[0][1])) {
            //retrieve refresh to get new access
            await retrieveData('REFRESH')
              .then(
                async value =>
                  await axios.post(
                    `${REACT_APP_URL}/rest-auth/token/refresh/`,
                    {
                      refresh: value,
                    },
                  ),
              )
              .then(
                //sets access to header
                async value => (
                  await storeData('ACCESS', value.data.access).then(
                    async value =>
                      (axiosConfig.defaults.headers.common[
                        'Authorization'
                      ] = `Bearer ${value}`),
                  ),
                  //save tokens
                  await saveAppData({
                    token: {
                      access: value.data.access,
                      refresh: Data[user].token.refresh,
                    },
                    transactions: {},
                  }),
                  //get new data and save
                  await saveNewData(),
                  await storeData('LOGGEDIN', true)
                ),
              );
          } else {
            //refresh access tokens are not expired
            await findActive()
              .then(async user => {
                //set token to header
                await retrieveData('APP_DATA').then(async value => {
                  axiosConfig.defaults.headers.common[
                    'Authorization'
                  ] = `Bearer ${value[user].token.access}`;
                });
              })
              //get and save user data
              .then(async () => saveNewData(), storeData('LOGGEDIN', true));
          }
        }
      });
    });
  });
};

//saving new contact
export const saveNewContact = async (data, oldData) => {
  //save data with previous data
  if (oldData) {
    //find active
    await findActive().then(async username => {
      //save new contacts
      await retrieveData('APP_DATA').then(async value => {
        await saveAppData({
          contacts: [
            ...oldData,
            {
              id: data.id,
              username: data.username,
              first_name: data.first_name,
              last_name: data.last_name,
              photo: data.photo,
            },
          ],
          transactions: {...value[username].transactions},
        });
      });
    });
  } else {
    //save data without previous data
    await findActive().then(async username => {
      //getting old contacts data
      //save new cantact
      await retrieveData('APP_DATA').then(async value => {
        await saveAppData({
          contacts: [
            ...value[username].contacts,
            {
              id: data.id,
              username: data.username,
              first_name: data.first_name,
              last_name: data.last_name,
              photo: data.photo,
            },
          ],
          transactions: {...value[username].transactions},
        });
      });
    });
  }
};

export const saveContact = async data => {
  //find active account
  await findActive().then(async username => {
    //retrieve contacts
    await retrieveData('APP_DATA').then(async value => {
      //checks that have the contact or not
      const contact = await value[username].contacts.filter(
        item => item.id === data.id,
      );
      if (value[username].contacts.length) {
        //have the contact
        if (contact[0]) {
          //overwrite contact data
          const oldData = value[username].contacts.filter(
            item => item.id != data.id,
          );
          await saveNewContact(data, oldData);
          RootNavigation.navigate('Home');
        } else {
          //have not the contact
          //through message to save contact
          return Promise.reject(
            `do you want to add ${data.username} to your contacts?`,
          );
        }
      } else {
        //have not any contact
        //through message to save contact
        return Promise.reject(
          `do you want to add ${data.username} to your contacts?`,
        );
      }
    });
  });
};

export default Api;
