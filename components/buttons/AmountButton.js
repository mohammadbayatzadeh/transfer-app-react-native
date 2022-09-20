import * as React from 'react';
import {Text, TouchableOpacity} from 'react-native';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';

//quick select button used in deposit and withdraw screen
const AmountButton = ({amount, func}) => {
  return (
    <TouchableOpacity style={styles.littleSimpleContainer} onPress={func}>
      <Text style={TextStyles.cancel}>${amount}</Text>
    </TouchableOpacity>
  );
};

export default AmountButton;
