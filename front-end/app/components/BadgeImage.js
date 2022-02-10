import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import BadgeGreen from '../assets/images/Badge1.png';
import BadgeRed from '../assets/images/Badge2.png';

const BadgeImage = ({status, image}) => {
  console.log(status);
  return (
    <View>
      <Image source={image} style={styles.originalImg} resizeMode="contain" />

      <Image
        source={status === 'green' ? BadgeGreen : BadgeRed}
        style={styles.badge}
        resizeMode="contain"
      />
    </View>
  );
};

export default BadgeImage;

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
  },
  originalImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
