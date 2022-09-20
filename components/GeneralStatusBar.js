import React from 'react';
import {View, StatusBar} from 'react-native';

//styles
import styles from '../styles/GeneralStatusBarStyles';

// to customize status bar 
export const GeneralStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
