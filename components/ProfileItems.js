import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

//images
const Vector = require('../assets/icons/login-signup/vectorDown.png');

//styles
import {TextStyles} from '../styles/TextStyles';
import {styles} from '../styles/style';
import {ImageStyles} from '../styles/ImageStyles';
import {moderateScale} from '../styles/scale';

//profile items in Profile screen
const ProfileItems = ({image, title, func, active = true}) => {
  return (
    <TouchableOpacity
      style={
        //check the active status to change the background color
        active
          ? {
              justifyContent: 'center',
              alignItems: 'center',
            }
          : {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: moderateScale(20),
            }
      }
      onPress={func}>
      <View style={styles.itemContainer}>
        {image && (
          <View style={styles.imageContainer}>
            <Image source={image} style={ImageStyles.smallItemIcon} />
          </View>
        )}
        <Text style={TextStyles.transName}>{title}</Text>
        <View style={{flex: 1}}></View>
        <Image
          source={Vector}
          style={{...ImageStyles.vector, transform: [{rotate: '-90deg'}]}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileItems;
