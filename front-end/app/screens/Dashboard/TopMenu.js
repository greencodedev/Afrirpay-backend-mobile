import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Person from '../../assets/images/p2.png';
import GlobalStyles from '../../style/globalStyle';
import * as Colors from '../../style/color';
import AlertImage from '../../components/Alert';
import MenuImg from '../../assets/images/Category.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TopMenu = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.content}>
      <View style={GlobalStyles.rowContainer}>
        <Image source={Person} style={styles.image} resizeMode="contain" />
        <View
          style={{
            marginLeft: 10,
          }}>
          <Text style={[GlobalStyles.font12, {color: Colors.darkPrimary}]}>
            Good Morning!
          </Text>
          <Text
            style={[
              GlobalStyles.font14,
              GlobalStyles.fontBold,
              {color: Colors.primaryTitle},
            ]}>
            Abdul Fouad
          </Text>
        </View>
      </View>
      <View style={GlobalStyles.rowContainer}>
        <AlertImage badgeShow={true} />
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => navigation.navigate('Menu')}>
          <Image source={MenuImg} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopMenu;

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  image: {
    width: 46,
    height: 46,
    borderRadius: 30,
  },
});
