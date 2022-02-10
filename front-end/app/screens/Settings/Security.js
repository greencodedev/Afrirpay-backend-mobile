import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ChevronRight, IconlyProvider} from 'react-native-iconly';
import SettingParentContainer from './SettingsParentContainer';

const authList = [
  {
    id: 0,
    name: 'AfrirPay/Google',
  },
  {
    id: 1,
    name: 'SMS',
  },
  {
    id: 2,
    name: 'Email',
  },
  {
    id: 3,
    name: 'Security',
  },
];

const Security = () => {
  const [isTouchId, setTouchID] = useState(false);
  const [isPattern, setPattern] = useState(false);

  return (
    <SettingParentContainer title={'Security'}>
      <View style={styles.authItemContent}>
        {authList.map(item => (
          <TouchableOpacity style={styles.authItem}>
            <View style={styles.authCard} key={item.id}>
              <View style={styles.authtext}>
                <Text>{item.name}</Text>
                <Text>Authentication</Text>
              </View>
              <IconlyProvider
                set="light"
                primaryColor={'#182D64'}
                secondaryColor={'#182D64'}
                stroke="bold"
                size="small">
                <ChevronRight />
              </IconlyProvider>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.itemContent}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>Activities</Text>
          <IconlyProvider>
            <ChevronRight />
          </IconlyProvider>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>Devices</Text>
          <IconlyProvider>
            <ChevronRight />
          </IconlyProvider>
        </TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Touch ID</Text>
          <Switch
            trackColor={{true: '#FFE9EE'}}
            thumbColor={isTouchId ? '#125FD2' : '#f4f3f4'}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={() => setTouchID(!isTouchId)}
            value={isTouchId}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Pattern</Text>
          <Switch
            trackColor={{true: '#FFE9EE'}}
            thumbColor={isPattern ? '#125FD2' : '#f4f3f4'}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={() => setPattern(!isPattern)}
            value={isPattern}
          />
        </View>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>Withdrawl Addresses</Text>
          <IconlyProvider>
            <ChevronRight />
          </IconlyProvider>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>Transfer Account</Text>
          <IconlyProvider>
            <ChevronRight />
          </IconlyProvider>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={[styles.itemTitle, {color: 'red'}]}>
            Disable Account
          </Text>
          <IconlyProvider>
            <ChevronRight />
          </IconlyProvider>
        </TouchableOpacity>
      </ScrollView>
    </SettingParentContainer>
  );
};

export default Security;

const styles = StyleSheet.create({
  authItemContent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  authItem: {
    width: '50%',
    paddingHorizontal: 2,
    paddingVertical: 3,
  },
  authCard: {
    borderRadius: 6,
    backgroundColor: '#EAEBED',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  item: {
    paddingVertical: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  authtext: {
    fontSize: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  itemContent: {
    padding: 15,
  },
});
