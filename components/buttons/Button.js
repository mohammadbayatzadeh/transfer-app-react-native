import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//styles
import {ButtonStyles} from '../../styles/ButtonStyles';
import {width as screenWidth} from '../../styles/scale';

//the button used in most screens
export const Button = ({
  func,
  title,
  width = screenWidth - 50,
  firstColor = '#13ABB7',
  secondColor = '#77EBAC',
  textColor = '#fff',
}) => {
  return (
    <TouchableOpacity onPress={func}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[firstColor, secondColor]}
        style={{...ButtonStyles.button, width: width}}>
        <Text style={{...ButtonStyles.buttonText, color: textColor}}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
