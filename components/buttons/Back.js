import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

//images
const Back_button = require('../../assets/icons/login-signup/Back.png');

//styles
import {ButtonStyles} from '../../styles/ButtonStyles';

//for navigating to previous route
const Back = ({navigation, direction, screen, param}) => {
  //choosing between going back to previous route or selected route(direction)
  const handleBackButtonClick = () => {
    //checks if selected a direction
    if (direction) {
      //checks if selected a screen
      screen
        ? //checks if have a param
          param
          ? navigation.navigate(direction, {screen: screen, params: {param}})
          : navigation.navigate(direction, {screen: screen})
        : param
        ? navigation.navigate(direction, {param})
        : navigation.navigate(direction);
    } else {
      navigation.goBack(null);
      return true;
    }
  };
  return (
    <TouchableOpacity
      style={ButtonStyles.iconContainer}
      onPress={() => handleBackButtonClick()}>
      <Image source={Back_button} style={ButtonStyles.backIcon} />
    </TouchableOpacity>
  );
};

export default Back;
