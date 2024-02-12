import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export {scale, verticalScale, moderateScale};

export const fontStyles = {
  MuseoSans300: 'MuseoSans300',
  MuseoSans500: 'MuseoSans500',
  MuseoSans700: 'MuseoSans700',
};

export const textStyles = {
  H1: {
    fontSize: scale(35),
  },
  H2: {
    fontSize: scale(24),
  },
  H3: {
    fontSize: scale(20),
  },
  H4: {
    fontSize: scale(16),
  },
  H5: {
    fontSize: scale(14),
  },
  Normal: {
    fontSize: scale(12),
  },
  Small: {
    fontSize: scale(10),
  },
  Smaller: {
    fontSize: scale(8),
  },
  Regular: {
    fontFamily: fontStyles.MuseoSans300,
  },
  Bold: {
    fontFamily: fontStyles.MuseoSans500,
    fontWeight: 600,
  },
  Bolder: {
    fontWeight: 800,
  },
  Center: {
    textAlign: 'center',
  },
  Right: {
    textAlign: 'right',
  },
  UpperCase: {
    textTransform: 'uppercase',
  },
  LineOver: {
    textDecorationLine: 'line-through',
  },
  B700: {
    fontWeight: '700',
  },
};
