import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import NotificationImg from '../assets/images/Notification.png';

const AlertImage = ({badgeShow}) => {
  return (
    <View>
      <Image source={NotificationImg} resizeMode="contain" />

      <View
        style={[styles.badge, {width: badgeShow ? 8 : 0}]}
        resizeMode="contain"
      />
    </View>
  );
};

export default AlertImage;

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: 1,
    top: -3,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#04CD00',
  },
  originalImg: {
    width: 20,
    height: 16,
  },
});
