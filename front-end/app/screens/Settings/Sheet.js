import React, {useRef, useMemo, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ChevronRight, IconlyProvider} from 'react-native-iconly';
import {useNavigation} from '@react-navigation/core';
import GlobalStyles from '../../style/globalStyle';
import BottomSheet from '@gorhom/bottom-sheet';

const lists = [
  {
    id: 0,
    name: 'Task Center',
  },
  {
    id: 1,
    name: 'Reward Center',
  },
  {
    id: 2,
    name: 'Pay',
  },
  {
    id: 3,
    name: 'Notifications',
    event: 'Notifications',
  },
  {
    id: 4,
    name: 'Payment Methods',
  },
  {
    id: 5,
    name: 'Security',
    event: 'Security',
  },
  {
    id: 6,
    name: 'Help & Support',
  },
  {
    id: 7,
    name: 'Share the app',
  },
];

const Sheet = () => {
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['2%', '85%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const navigation = useNavigation();
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <View style={styles.mainContainer}>
        <View style={[GlobalStyles.borderBottom1, styles.itemContent]}>
          <Text style={[GlobalStyles.font14, GlobalStyles.fontBold]}>
            Linked Accounts
          </Text>
          <View style={[GlobalStyles.justifyBetweenContent]}>
            <Text style={[GlobalStyles.font14, {marginTop: 10}]}>
              Add a bank or card
            </Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={[GlobalStyles.font14, {color: 'white'}]}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[GlobalStyles.borderBottom1, styles.itemContent]}>
          <Text style={[GlobalStyles.font14, GlobalStyles.fontBold]}>
            Account
          </Text>
          <View style={[GlobalStyles.justifyBetweenContent]}>
            <Text style={[GlobalStyles.font14, {marginTop: 10}]}>
              Native Currency
            </Text>
            <TouchableOpacity style={GlobalStyles.rowContainer}>
              <Text style={[GlobalStyles.font14]}>USD</Text>
              <IconlyProvider
                set="light"
                primaryColor={'#A8A8A8'}
                secondaryColor={'#A8A8A8'}
                stroke="bold"
                size="medium">
                <ChevronRight />
              </IconlyProvider>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            GlobalStyles.justifyBetweenContent,
            GlobalStyles.borderBottom1,
            styles.itemContent,
          ]}>
          <Text style={GlobalStyles.font14}>Country</Text>
          <TouchableOpacity style={GlobalStyles.rowContainer}>
            <Text style={[GlobalStyles.font14]}>United States</Text>
            <IconlyProvider
              set="light"
              primaryColor={'#A8A8A8'}
              secondaryColor={'#A8A8A8'}
              stroke="bold"
              size="medium">
              <ChevronRight />
            </IconlyProvider>
          </TouchableOpacity>
        </View>
        {lists.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.itemContent, GlobalStyles.justifyBetweenContent]}
            onPress={() => navigation.navigate(item.event)}>
            <Text style={styles.itemText}>{item.name}</Text>
            <IconlyProvider
              set="light"
              primaryColor={'#A8A8A8'}
              secondaryColor={'#A8A8A8'}
              stroke="bold"
              size="medium">
              <ChevronRight />
            </IconlyProvider>
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheet>
  );
};

export default Sheet;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },

  name: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '600',
    color: '#182D64',
  },
  phone: {
    fontSize: 16,
    lineHeight: 20,
  },
  itemContent: {
    paddingVertical: 15,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: '#00CA78',
    fontSize: 14,
    color: 'white',
    width: 64,
    height: 34,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
