import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//components
import Splash from '../SplashPages/Splash';
import TermAndPolicy from '../SplashPages/TermAndPolicy';
import Ad from '../SplashPages/Ad'
import Terms from '../SharedPages/Terms';


const SplashStack = createNativeStackNavigator();

const SplashApp = () => {
  return (
    <SplashStack.Navigator
      initialRouteName="Ad"
      screenOptions={{headerShown: false}}>
      <SplashStack.Screen name="Splash" component={Splash} />
      <SplashStack.Screen name="Ad" component={Ad} />
      <SplashStack.Screen name="TermAndPolicy" component={TermAndPolicy} />
      <SplashStack.Screen name="Terms" component={Terms} />

    </SplashStack.Navigator>
  );
};

export default SplashApp;
