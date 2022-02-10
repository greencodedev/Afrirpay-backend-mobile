import React, {useRef, useMemo, useCallback} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import AssetCard from './AssetCard';
import Contacts from './Contacts';
import SpecialOffer from './SpecialOffer';
import BottomSheet from '@gorhom/bottom-sheet';
import Sheet from './Sheet';
import TopMenu from './TopMenu';

const Dashboard = () => {
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['1%', '48%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={styles.container}>
      <TopMenu />
      <AssetCard />
      <Contacts title={'Contacts'} />
      <SpecialOffer />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <Sheet />
        </View>
      </BottomSheet>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3FA',
    paddingTop: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
