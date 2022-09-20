import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

//styles
import {TextStyles} from '../../styles/TextStyles';
import {moderateScale, width} from '../../styles/scale';
import {styles} from '../../styles/style';

//picking date used for birthday in accoun edit screen
export const DatePick = ({birthday, setBirthday}) => {
  const [datePicker, setDatePicker] = useState(false);
  function showDatePicker() {
    setDatePicker(true);
  }
  function onDateSelected(event, value) {
    setBirthday(value);
    setDatePicker(false);
  }
  return (
    <View style={styleSheet.MainContainer}>
      <View>
        <Text style={TextStyles.cancel}>Birthday :</Text>
        <View style={{...styles.details, width: width / 2}}>
          <Text style={TextStyles.text}>
            {birthday
              ? new Date(birthday).toDateString()
              : 'birthday not entered'}
          </Text>
        </View>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={{...TextStyles.thinText, color: '#1DAB87'}}>Change</Text>
        </TouchableOpacity>
      </View>

      {datePicker && (
        <DateTimePicker
          value={birthday ? new Date(birthday) : new Date('1998-01-10')}
          mode={'date'}
          maximumDate={new Date()}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateSelected}
          style={styleSheet.datePicker}
        />
      )}
    </View>
  );
};

const styleSheet = StyleSheet.create({
  MainContainer: {
    width: width / 2,
    padding: 6,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },

  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: moderateScale(320),
    height: moderateScale(260),
    display: 'flex',
  },
});
