import {retrieveData, storeData, RemoveData} from './config';
import * as RootNavigation from '../RootNavigation';

//actives the selected account
//deactives other accounts
export const Activition = async user => {
  //gets accounts list
  await retrieveData('USER_ACTIVE').then(async value => {
    if (!!value) {
      //deactive all accounts but selected one
      let prev = value.filter(item => item.username !== user);
      if (prev.length > 2) {
        deleteAccount(prev[0].username);
        prev.splice(0, 1);
      }
      const data = prev.map(item => {
        let container = {};
        container.username = item.username;
        container.isactive = false;
        return container;
      });
      //saves accounts list
      await storeData('USER_ACTIVE', [
        ...data,
        {username: user, isactive: true},
      ]);
    } else {
      await storeData('USER_ACTIVE', [{username: user, isactive: true}]);
    }
  });
};

//logout of selected account
export const logoutUser = async username => {
  //getting accounts list
  await retrieveData('USER_ACTIVE').then(async value => {
    const prev = await value.filter(item => item.username !== username);
    //have more than one acount
    if (prev[0]) {
      //log out of account and clear data
      prev[0].isactive = true;
      await storeData('USER_ACTIVE', [...prev]);
      await deleteAccount(username);
      await changeAccount(prev[0].username, 'Home');
    } else {
      //have just one account
      //log out of account cleat all app data such as pin code , token , user data and push to login screen
      await storeData('USER_ACTIVE', [...prev]);
      await deleteAccount(username);
      await RemoveData('ACCESS');
      await RemoveData('REFRESH');
      await storeData('PIN', 0);
      await storeData('ADD', false);
      await storeData('LOGGEDIN', false);
      RootNavigation.navigate('AuthApp', {screen: 'Signin'});
    }
  });
};

//finds the active account
//for getting Appropriate data
export const findActive = async () => {
  let username = '';
  //get account list
  await retrieveData('USER_ACTIVE').then(value => {
    //finds active one
    if (value) {
      const prev = value.filter(item => item.isactive === true);
      username = prev[0].username;
    }
  });
  return Promise.resolve(username);
};

//general save app data function
export const saveAppData = async data => {
  //finding active account
  await findActive().then(async username => {
    //retrieve app data
    await retrieveData('APP_DATA').then(async value => {
      //checking have weany app data?
      if (!!Object.keys(value).length) {
        //data for user found
        //save data for Appropriate account
        !value[username] && (value[username] = {});
        data.user && (value[username].user = {...data.user});
        data.token && (value[username].token = {...data.token});
        !!Object.keys(data.transactions).length &&
          (value[username].transactions = {...data.transactions});
        !value[username].contacts && (value[username].contacts = []);
        data.contacts && (value[username].contacts = [...data.contacts]);
        !value[username].notification && (value[username].notification = []);
        data.notification &&
          (value[username].notification = [...data.notification]);

        await storeData('APP_DATA', {...value});
      } else {
        //data for user  not found
        //save data
        await storeData('APP_DATA', {[username]: data});
      }
    });
  });
};

//changes the active account and pushes to Home screen
export const changeAccount = async username => {
  await Activition(username);
  RootNavigation.navigate('HomeApp', {screen: 'Home'});
};

//deletes the selected account and cleat its data
export const deleteAccount = async username => {
  await retrieveData('APP_DATA').then(async value => {
    delete value[`${username}`];
    storeData('APP_DATA', value);
  });
};

//general notifications function
export const changenotif = async notifs => {
  //finds active account
  await findActive().then(async username => {
    //gets account notifications
    await retrieveData('APP_DATA').then(async data => {
      //have notifcations
      if (data[username].notification.length !== 0) {
        //add unread satus to all notifications
        const changedNotifs = notifs.map(item => {
          let container = {};
          container = {...item};
          container.isRead = false;
          return container;
        });
        //sort them
        let oldNotifs = data[username].notification.filter(o1 =>
          changedNotifs.some(o2 => o1.id === o2.id),
        );
        const firstId = oldNotifs[0].id;
        let newNotifs = changedNotifs.filter(item => item.id > firstId);
        const allNotifs = [...newNotifs, ...oldNotifs];
        //store them
        await saveAppData({
          notification: allNotifs,
          transactions: data[username].transactions,
        });
      }
      //not have notifcations
      else {
        //add unread satus to all notifications
        const newNotifs = notifs.map(item => {
          let container = {};
          container = {...item};
          container.isRead = false;
          return container;
        });
        //store them
        await saveAppData({notification: [...newNotifs], transactions: {}});
      }
    });
  });
};
