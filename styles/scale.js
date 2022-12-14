import {Dimensions} from 'react-native';
export const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 640;

const horzontalScale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (horzontalScale(size) - size) * factor;

export {horzontalScale, verticalScale, moderateScale};
