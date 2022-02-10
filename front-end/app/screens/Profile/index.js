import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import MenuImg from '../../assets/images/Menu.png';
import ProfileImg from '../../assets/images/p1.png';
import LogoutImg from '../../assets/images/LogOut.png';
import {ArrowRight, IconlyProvider} from 'react-native-iconly';
import {useNavigation} from '@react-navigation/core';
import {AuthContext} from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lists = [
  {
    id: 0,
    value: 0.57,
    label: 'Bitcoin',
  },
  {
    id: 1,
    value: 15.55,
    label: 'Ethereum',
  },
  {
    id: 2,
    value: 75.87,
    label: 'Monero',
  },
];

const Profile = () => {
  const [isDark, setDarkTheme] = useState(false);
  const [isPN, setPushNotification] = useState(false);
  const navigation = useNavigation();
  const {signOut} = useContext(AuthContext);

  const [userdata, setUserData] = useState({});
  let {username, phone} = userdata;

  useEffect(() => {
    // alert(route.params.value);
    const activeUser = async () => {
      try {
        const token = await AsyncStorage.getItem('userData');

        if (token !== null) {
          // We have data!!

          setUserData(JSON.parse(token));
        }
      } catch (e) {
        console.log(e);
      }
    };

    activeUser();
  }, []);

  const handleLogOut = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.justiBetweenContent}>
        <Image source={MenuImg} resizeMode="cover" />
        <Text style={styles.title}>Account</Text>
        <View />
      </View>
      <View style={[styles.centerContent]}>
        <View style={[styles.avatarImageContent, {marginVertical: 10}]}>
          <Image
            source={ProfileImg}
            resizeMode="cover"
            style={styles.avatarImage}
          />
        </View>
        <Text style={[styles.nameText, {marginVertical: 20}]}>{username}</Text>
        <Text style={styles.wallet}>$ 6647.57</Text>
      </View>
      <View style={[styles.listsContent, {marginVertical: 20}]}>
        {lists.map(item => (
          <View key={item.id} style={styles.centerText}>
            <Text style={[styles.font14, styles.fontBold]}>{item.value}</Text>
            <Text style={[styles.font14, styles.greyText]}>{item.label}</Text>
          </View>
        ))}
      </View>
      <View>
        <View style={[styles.justiBetweenContent, styles.listItem]}>
          <Text style={styles.font14}>Phone</Text>
          <View style={styles.rowContent}>
            <Text style={[styles.font12, styles.greyText, {marginRight: 10}]}>
              {phone}
            </Text>
            <TouchableOpacity>
              <Text style={styles.primaryColor}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.justiBetweenContent, styles.listItem]}>
          <Text style={styles.font14}>Pin</Text>
          <TouchableOpacity>
            <Text style={styles.primaryColor}>Change Pin</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.justiBetweenContent, styles.listItem]}>
          <Text style={styles.font14}>Push Notification</Text>
          <Switch
            trackColor={{true: '#FFE9EE'}}
            thumbColor={isPN ? '#125FD2' : '#f4f3f4'}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={() => setPushNotification(!isPN)}
            value={isPN}
          />
        </View>
        <View style={[styles.justiBetweenContent, styles.listItem]}>
          <Text style={styles.font14}>Dark Mode</Text>
          <Switch
            trackColor={{true: '#FFE9EE'}}
            thumbColor={isDark ? '#125FD2' : '#f4f3f4'}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={() => setDarkTheme(!isDark)}
            value={isDark}
          />
        </View>
        <TouchableOpacity
          style={[styles.justiBetweenContent, styles.listItem]}
          onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.font14}>Settings</Text>
          <IconlyProvider
            set="light"
            primaryColor={'#A8A8A8'}
            secondaryColor={'#A8A8A8'}
            stroke="bold"
            size="medium">
            <ArrowRight />
          </IconlyProvider>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.listItem,
            {display: 'flex', alignItems: 'center', flexDirection: 'row'},
          ]}
          onPress={handleLogOut}>
          <Image source={LogoutImg} resizeMode="contain" />
          <Text style={[styles.primaryColor, {marginLeft: 10}]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F1F3FA',
    paddingVertical: 40,
  },
  justiBetweenContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerText: {
    display: 'flex',
    alignItems: 'center',
  },
  listsContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  centerContent: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: '#444444',
    fontSize: 16,
    fontWeight: '700',
  },
  avatarImageContent: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#407BFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  nameText: {
    color: '#182D64',
    fontSize: 18,
    fontWeight: '600',
  },
  wallet: {
    backgroundColor: '#FFEEF2',
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  font12: {
    fontSize: 12,
  },
  font14: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444444',
  },
  greyText: {
    color: '#A8A8A8',
  },
  fontBold: {
    fontWeight: '600',
  },
  primaryColor: {
    color: '#125FD2',
  },
  rowContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  listItem: {
    paddingVertical: 20,
    borderBottomColor: '#EDECEC',
    borderBottomWidth: 1,
  },
});
