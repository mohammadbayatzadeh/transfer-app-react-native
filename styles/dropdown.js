import {StyleSheet} from 'react-native';
import {moderateScale} from './scale';

//all dropdowns styles
export const dropdownStyles = StyleSheet.create({
  dropdown: {
    width: moderateScale(90),
    borderBottomColor: '#1EB0B5',
    borderBottomWidth: 0.5,
    marginRight: 10,
    color: '#013335',
  },
  shadow: {
    shadowColor: '#000',
    color: '#013335',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    color: '#013335',
  },
  item: {
    padding: 4,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#013335',
  },
  textItem: {
    flex: 1,
    fontSize: moderateScale(16),
    color: '#013335',
  },
});
