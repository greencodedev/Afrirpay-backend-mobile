import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#FF5678',
  secondary: '#FE6A92',
  blue: '#0682FE',
  appPrimary: '#8B16FF',
  black: '#171717',
  white: '#FFFFFF',
  purple2: '#8B16FF',
  background: '#FFFFFF',
  grey: '#F1F3FA',
  dark_1: '#182D64',
  dark_2: 'rgba(38, 38, 38, 0.6)',
  dark_2_0: '#4E5C80',
  dark_3: '#7581A1',
  dark_8: 'rgba(241, 243, 250, 1)',
  dark_4: '#959FBA',
  dark_5: '#abb1c2',
  Neutral: '#757575',
  Neutral_100: '#0A0A0A',
  darkBlue: '#2553DA',
  text3: '#6C757D',
};

export const SIZES = {
  base: 10,
  width,
  height,
  padding: 10,
  padding2: 12,
};

export const FONTS = {
  largeTitle: {fontFamily: 'Roboto-Black', fontSize: SIZES.largeTitle},
  h1: {fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22},
  h5: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h5, lineHeight: 22},
  body1: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body4, lineHeight: 22},
  body5: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body5, lineHeight: 22},
};

const theme = {COLORS, SIZES, FONTS};

export default theme;
