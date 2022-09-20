import * as React from 'react';
import {Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

//styles
import {dropdownStyles} from '../../styles/dropdown';
import {moderateScale} from '../../styles/scale';

//dropdown used in activity screen
const DropdownComp = props => {
  //render items
  const renderItem = item => {
    return (
      <View style={dropdownStyles.item}>
        <Text style={dropdownStyles.textItem}> {item.label}</Text>
      </View>
    );
  };
  return (
    <Dropdown
      style={dropdownStyles.dropdown}
      containerStyle={dropdownStyles.shadow}
      data={props.data}
      labelField="label"
      valueField="value"
      selectedTextStyle={{color: '#013335'}}
      placeholderStyle={{color: '#013335'}}
      label="Dropdown"
      iconColor="#013335"
      maxHeight={props.type ? moderateScale(200) : moderateScale(120)}
      placeholder={props.dropdown}
      value={props.dropdown}
      onChange={item => {
        props.setDropdown(item.value);
      }}
      renderItem={item => renderItem(item)}
      textError="Error"
    />
  );
};

export default DropdownComp;
