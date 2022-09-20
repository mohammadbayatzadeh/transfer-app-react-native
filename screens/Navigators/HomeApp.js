import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TourGuideProvider} from 'rn-tourguide';

//components
import My_Account from '../HomePages/My_Account';
import Home from '../HomePages/Home';
import Scan_QR from '../HomePages/Scan_QR';
import My_QR from '../HomePages/My_QR';
import Transfer from '../HomePages/Transfer';
import Profile from '../HomePages/Profile';
import Newpassword from '../SharedPages/Newpassword';
import My_Account_Edit from '../HomePages/My_Account _Edit';
import Activity from '../HomePages/Activity';
import Referral from '../HomePages/Referral';
import Contacts from '../HomePages/Contacts';
import Settings from '../HomePages/Settings';
import Notification from '../HomePages/Notification';
import FAQ from '../HomePages/FAQ';
import Withdraw from '../HomePages/Withdraw';
import Deposit from '../HomePages/Deposit';
import Terms from '../SharedPages/Terms';
import Create_PIN from '../SharedPages/Create_PIN';
import Lottery from '../HomePages/Lottery';
import AllWinners from '../HomePages/AllWinners';

const HomeStack = createNativeStackNavigator();

const HomeApp = () => {
  return (
    <TourGuideProvider {...{borderRadius: 16}} preventOutsideInteraction>
      <HomeStack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="Activity" component={Activity} />
        <HomeStack.Screen name="Deposit" component={Deposit} />
        <HomeStack.Screen name="My_Account_Edit" component={My_Account_Edit} />
        <HomeStack.Screen name="Withdraw" component={Withdraw} />
        <HomeStack.Screen name="Terms" component={Terms} />
        <HomeStack.Screen name="Lottery" component={Lottery} />
        <HomeStack.Screen name="Create_PIN" component={Create_PIN} />
        <HomeStack.Screen name="AllWinners" component={AllWinners} />
        <HomeStack.Screen name="Profile" component={Profile} />
        <HomeStack.Screen name="Contacts" component={Contacts} />
        <HomeStack.Screen name="Settings" component={Settings} />
        <HomeStack.Screen name="FAQ" component={FAQ} />
        <HomeStack.Screen name="My_Account" component={My_Account} />
        <HomeStack.Screen name="Scan_QR" component={Scan_QR} />
        <HomeStack.Screen name="Referral" component={Referral} />
        <HomeStack.Screen name="My_QR" component={My_QR} />
        <HomeStack.Screen name="Transfer" component={Transfer} />
        <HomeStack.Screen name="Newpassword" component={Newpassword} />
        <HomeStack.Screen name="Notification" component={Notification} />
      </HomeStack.Navigator>
    </TourGuideProvider>
  );
};

export default HomeApp;
