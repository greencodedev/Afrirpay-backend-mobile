import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width;

const Button = ({
  text,
  onPress,
  type = 'filled',
  bordered = false,
  size = 'large',
  isDisabled = false,
}) => {
  const large = '100%';
  const small = 50;
  const btnWidth = size === 'large' ? large : small;
  const btnHeight = size === 'large' ? 20 : 5;
  const fontSize = size === 'large' ? 18 : 12;
  const btnTextColor = type === 'filled' ? '#ffffff' : '#000000';
  const btnBorderRadius = bordered ? 3 : 40;

  //   const disa  =  dis === true ?

  const containerCommonStyle = {
    paddingVertical: btnHeight,
    width: btnWidth,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  };

  let isDisa = isDisabled ? true : false;

  const textCommonStyle = {
    color: btnTextColor,
    fontSize: fontSize,
    textTransform: 'none',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    fontWeight: '700',
  };

  // const border = type === 'outlined' && {
  //   borderColor: '#e7e7e7',
  //   borderWidth: 2,
  // };

  let buttonBackgroundColor = isDisabled
    ? ['#8B16FF80', '#125FD280']
    : ['#8B16FF', '#125FD2'];

  if (type === 'outlined') {
    return (
      <LinearGradient
        colors={['#8B16FF', '#125FD2']}
        locations={[0.4, 1]}
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          },
        ]}>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
  return (
    <LinearGradient
      colors={buttonBackgroundColor}
      locations={[0.4, 1]}
      style={[containerCommonStyle, {borderRadius: btnBorderRadius}]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={isDisa}>
        <Text style={[textCommonStyle]}> {text} </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Button;

const styles = StyleSheet.create({
  grediant: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    // flex: 1.0,
    // alignSelf: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: '99%',
    margin: 1,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    padding: 15,
    marginLeft: 1,
    marginRight: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
