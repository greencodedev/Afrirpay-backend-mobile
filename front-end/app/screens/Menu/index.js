import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CancelImg from '../../assets/images/Cancel.png';
import {useNavigation} from '@react-navigation/core';
import GlobalStyles from '../../style/globalStyle';
import {TextInput} from 'react-native-gesture-handler';
import {IconlyProvider, Search} from 'react-native-iconly';

import MenuIcon1 from '../../assets/images/MenuIcon1.png';
import MenuIcon2 from '../../assets/images/MenuIcon2.png';
import MenuIcon3 from '../../assets/images/MenuIcon3.png';
import MenuIcon4 from '../../assets/images/MenuIcon4.png';
import MenuIcon5 from '../../assets/images/MenuIcon5.png';
import MenuIcon6 from '../../assets/images/MenuIcon6.png';
import MenuIcon7 from '../../assets/images/MenuIcon7.png';
import MenuIcon8 from '../../assets/images/MenuIcon8.png';

const lists = [
  {
    id: 1,
    image: MenuIcon1,
    title: 'Send Money',
  },
  {
    id: 2,
    image: MenuIcon2,
    title: 'Top up Wallet',
  },
  {
    id: 3,
    image: MenuIcon3,
    title: 'Bill Payment',
  },
  {
    id: 4,
    image: MenuIcon4,
    title: 'Withdraw',
  },
];

const otherLists = [
  {
    id: 1,
    image: MenuIcon5,
    title: 'History Transactions',
  },
  {
    id: 2,
    image: MenuIcon6,
    title: 'Request Payment',
  },
  {
    id: 3,
    image: MenuIcon7,
    title: 'Settings',
  },
  {
    id: 4,
    image: MenuIcon8,
    title: 'Help',
  },
];

const Menu = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={[GlobalStyles.justifyBetweenContent, {padding: 20}]}>
        <TouchableOpacity
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
          onPress={() => navigation.goBack()}>
          <Image source={CancelImg} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.title}>Menu</Text>
        <View style={{width: 20}} />
      </View>
      <ScrollView>
        <View style={[styles.searchText]}>
          <TextInput
            placeholder="Search"
            style={[{fontSize: 14, width: '90%'}]}
          />
          <IconlyProvider
            set="light"
            primaryColor={'#A8A8A8'}
            secondaryColor={'#A8A8A8'}
            stroke="bold"
            size="medium">
            <Search />
          </IconlyProvider>
        </View>
        <View
          style={[
            GlobalStyles.justifyBetweenContent,
            styles.listItem,
            {marginTop: 10},
          ]}>
          <Text style={styles.shortCut}>Shortcuts</Text>
          <Text style={styles.customize}>Customize</Text>
        </View>
        {lists.map(item => (
          <TouchableOpacity key={item.id} style={GlobalStyles.borderBottom1}>
            <View style={[styles.listItem, GlobalStyles.rowContainer]}>
              <Image source={item.image} resizeMode="contain" />
              <Text
                style={[
                  GlobalStyles.font14,
                  GlobalStyles.fontBold,
                  {marginLeft: 10},
                ]}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={[styles.listItem, {marginTop: 10}]}>
          <Text style={styles.shortCut}>Other Menu</Text>
        </View>
        {otherLists.map(item => (
          <TouchableOpacity key={item.id} style={GlobalStyles.borderBottom1}>
            <View style={[styles.listItem, GlobalStyles.rowContainer]}>
              <Image source={item.image} resizeMode="contain" />
              <Text
                style={[
                  GlobalStyles.font14,
                  GlobalStyles.fontBold,
                  {marginLeft: 10},
                ]}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '700',
  },
  searchText: {
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e7e7f6',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shortCut: {
    fontSize: 14,
    color: '#08243170',
  },
  customize: {
    fontSize: 14,
    color: '#525298',
  },
  listItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
