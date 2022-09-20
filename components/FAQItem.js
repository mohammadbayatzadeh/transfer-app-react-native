import * as React from 'react';
import {Text, View} from 'react-native';

//styles
import {styles} from '../styles/style';
import {TextStyles} from '../styles/TextStyles';

//FAQ item used in FAQ screen
const FAQItem = ({title, text}) => {
  return (
    <View style={styles.simpleContainer}>
      <Text style={TextStyles.profileTitle}>{title}</Text>
      <Text style={TextStyles.transType}>{text}</Text>
    </View>
  );
};

export default FAQItem;
