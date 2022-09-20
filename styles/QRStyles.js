import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {moderateScale} from './scale';

//all Qr component styles
export const QRStyles = StyleSheet.create({
  sectionContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: moderateScale(12),
    fontWeight: '600',
    padding: 4,
    textAlign: 'right',
  },
  centerText: {
    flex: 1,
    fontSize: moderateScale(16),
    padding: 32,
    color: 'rgba(6, 184, 157, 1)',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: moderateScale(15),
    color: 'rgba(6, 184, 157, 1)',
  },
});
