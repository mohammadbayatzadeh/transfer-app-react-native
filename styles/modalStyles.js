import {StyleSheet} from 'react-native';
import {width, moderateScale} from './scale';

//all modals styles
export const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  centerModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  modal: {
    width: width,
    backgroundColor: '#fff',
    padding: moderateScale(30),
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
  },
  depositModal: {
    width: width,
    backgroundColor: '#fff',
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
  },
  centerModal: {
    width: width - 50,
    backgroundColor: '#fff',
    padding: moderateScale(20),
    borderRadius: moderateScale(20),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    flex: 1,
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(20),
  },
  searchInput: {
    fontSize: moderateScale(16),
    color: '#013335',
    flex: 1,
  },
  modalcontent: {
    backgroundColor: '#EFF3F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
    borderRadius: moderateScale(16),
    padding: moderateScale(25),
    flexWrap: 'wrap',
  },
  modalItem: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(10),
  },
});
