// app/utils/responsive.js
import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

/** width percent: wp(35) ~ 35% of screen width */
export const wp = (percent) => {
  const p = typeof percent === 'string' ? parseFloat(percent) : percent;
  return PixelRatio.roundToNearestPixel((width * p) / 100);
};

/** height percent: hp(20) ~ 20% of screen height */
export const hp = (percent) => {
  const p = typeof percent === 'string' ? parseFloat(percent) : percent;
  return PixelRatio.roundToNearestPixel((height * p) / 100);
};
