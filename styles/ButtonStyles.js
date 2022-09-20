import {StyleSheet} from 'react-native';
import {width, moderateScale} from './scale';

//all buttons styles
export const ButtonStyles = StyleSheet.create({
  iconContainer: {
    width: width / 10,
    height: width / 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    padding: moderateScale(10),
    backgroundColor: 'rgba(255,255,255,.2)',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: moderateScale(10),
  },
  backIcon: {
    width: width / 20,
    height: width / 20,
    resizeMode: 'contain',
  },
  dot: {
    width: moderateScale(4),
    height: moderateScale(4),
    borderRadius: moderateScale(4),
    maegin: 1,
    backgroundColor: '#013335',
  },
  button: {
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(16),
    color: '#013335',
    padding: moderateScale(10),
    marginVertical: moderateScale(15),
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  scanButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: moderateScale(10),
    borderRadius: moderateScale(16),
  },
});
