import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//components
import Signin from '../AuthPages/Signin';
import Signup from '../AuthPages/Signup';
import OTP from '../AuthPages/OTP';
import Recovery from '../AuthPages/Recovery';
import Newpassword from '../SharedPages/Newpassword';
import Create_PIN from '../SharedPages/Create_PIN';
import TermAndPolicy from '../SplashPages/TermAndPolicy';

const AuthStack = createNativeStackNavigator();

const AuthApp = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Signin"
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Signin" component={Signin} />
      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name="Newpassword" component={Newpassword} />
      <AuthStack.Screen name="Create_PIN" component={Create_PIN} />
      <AuthStack.Screen name="Recovery" component={Recovery} />
      <AuthStack.Screen name="OTP" component={OTP} />
      <AuthStack.Screen name="TermAndPolicy" component={TermAndPolicy} />
    </AuthStack.Navigator>
  );
};

export default AuthApp;
