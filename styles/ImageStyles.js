import {StyleSheet} from 'react-native';
import {width, moderateScale} from './scale';

//all images styles
export const ImageStyles = StyleSheet.create({
  splashLogo: {
    width: moderateScale(150),
    height: moderateScale(150),
    marginBottom: moderateScale(20),
  },
  bellImage: {
    borderColor: '#fff',
    borderWidth: 0.3,
    padding: moderateScale(8),
    borderRadius: moderateScale(5),
  },
  walletMark: {
    width: moderateScale(70),
    height: moderateScale(30),
    marginTop: moderateScale(18),
  },
  itemIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
    resizeMode: 'contain',
  },
  smallItemIcon: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
  },

  designPic: {
    flex: 1,
    width: width - moderateScale(260),
    transform: [{translateY: moderateScale(1)}],
  },

  circleOne: {
    width: moderateScale(25),
    height: moderateScale(25),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: moderateScale(13),
    transform: [{translateX: moderateScale(10)}],
  },
  circleTwo: {
    width: moderateScale(25),
    height: moderateScale(25),
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: moderateScale(13),
  },
  vector: {
    width: moderateScale(20),
    height: moderateScale(10),
    resizeMode: 'contain',
  },
  searchImage: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    marginRight: moderateScale(10),
  },
  logo: {
    width: moderateScale(30),
    height: moderateScale(30),
    marginRight: moderateScale(10),
  },
  smallProfile: {
    width: moderateScale(35),
    height: moderateScale(35),
    resizeMode: 'contain',
    marginRight: moderateScale(8),
    borderRadius: moderateScale(35),
  },
  normalProfile: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: 'contain',
    marginRight: moderateScale(8),
    borderRadius: moderateScale(35),
  },
  largeProfile: {
    width: moderateScale(90),
    height: moderateScale(90),
    resizeMode: 'contain',
    borderRadius: moderateScale(90),
  },
  successfullImage: {
    width: moderateScale(250),
    height: moderateScale(250),
    resizeMode: 'contain',
  },
  QR: {
    width: width - moderateScale(200),
    height: width - moderateScale(200),
  },
  slide: {
    width: width - 50,
    height: moderateScale(100),
    resizeMode: 'cover',
  },
  lotterySlide: {
    width: width - 50,
    height: moderateScale(100),
    resizeMode: 'contain',
    marginBottom: moderateScale(8),
  },
});
