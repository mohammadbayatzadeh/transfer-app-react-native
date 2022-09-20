import * as React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

//styles
import {styles} from '../styles/style';
import {ImageStyles} from '../styles/ImageStyles';
import {TextStyles} from '../styles/TextStyles';

//images
const Down = require('../assets/icons/login-signup/vectorDown.png');
const Choosen = require('../assets/icons/login-signup/choosen.png');

//showing items in country component used in signup
const CountryItem = props => {
  //changes the selected country
  const touchHandler = () => {
    if (!props.abbreviation) {
      props.setvisible(true);
    } else {
      props.setchoosen(props.data);
      props.setvisible(false);
    }
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.countryContainer,
        backgroundColor: !props.abbreviation && '#F9FAFB',
      }}
      onPress={e => touchHandler(e.currentTarget)}>
      <View style={styles.details}>
        <Image source={{uri: `${props.image}`}} style={ImageStyles.itemIcon} />
        {!!props.abbreviation && (
          <Text style={TextStyles.name}>{props.abbreviation}</Text>
        )}
        <Text style={TextStyles.title}>{props.name}</Text>
      </View>
      {!props.abbreviation && (
        <Image source={Down} style={ImageStyles.vector} />
      )}
      {props.abbreviation === props.choosen.abbreviation && (
        <Image source={Choosen} style={ImageStyles.vector} />
      )}
    </TouchableOpacity>
  );
};

export default CountryItem;
