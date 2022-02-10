import React, {useState , useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Thankyou from '../../assets/images/thankyou.svg';
import axios from 'axios';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;
import {COLORS, SIZES} from '../../constants/index';
import Logo from '../../assets/images/logo.png';

import GradientText from '../../constants/gradientText';
import Button from '../../components/Button';
// import { LinearGradient } from 'expo-linear-gradient';
export default function NewPin({navigation, route}) {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    const retrieveToken = async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');

        setToken(userToken);
      } catch (e) {
        console.log(e);
      }
      if (token !== null) {
        // We have data!!

        return token;
      }
    };

    retrieveToken();
  }, []);
  const [token, setToken] = useState('');
  
  console.log(token, 'token');

  let {phone, pin} = route.params;
  const onPress = () => {
    let data = JSON.stringify({
      phone: phone,
      new_pin: pin,
      confirm_new_pin: value,
    });
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNhY2hlZF9kYXRhIjp7Il9pZCI6IjYxOWUzMThkMDk2OThjYzg3MGNkYTNhZiIsInBob25lIjoiMDcwMjY3Njk1NjUifX0sImlhdCI6MTYzNzkzNjc1NSwiZXhwIjoxNjM3OTM3MzU1fQ.BOzb9tMPwhUWsFuSfVGr_SJ0fvF-Y73hfXEoVBGA3BI'

    let config = {
      method: 'post',
      url: 'https://afrirpayuserservice.herokuapp.com/api/v1/auth/reset-pin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        alert(response.data.message);

        navigation.navigate('Dashboard');
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  console.log(phone, 'phone');
  console.log(pin, 'pin');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.topContain}>
          <Image style={styles.logo} source={Logo} />

          <Text style={styles.text}>Confirm new PIN </Text>

          {/* <Text style={styles.phoneNumber}>{realPhoneNumber}</Text> */}
        </View>
        <View>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={(styles.codeFieldRoot, styles.inputContainer)}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        <View>
          <Button
            text="Confirm"
            type="filled"
            bordered
            size="large"
            onPress={onPress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
  },

  inner: {
    flex: 1,
    justifyContent: 'space-around',
  },

  input: {
    backgroundColor: 'red',
    padding: SIZES.base * 1,
    backgroundColor: '#F1F3FA',
    borderRadius: SIZES.base * 1,
  },
  //   style for inputText
  inputText: {
    fontSize: SIZES.base * 2,
    color: COLORS.appPrimary,
    fontWeight: 'bold',
    marginRight: SIZES.base * 2,
    backgroundColor: '#F1F3FA',
    padding: SIZES.base * 1,
    borderRadius: SIZES.base * 1,
  },

  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5,
    color: COLORS.appPrimary,
  },

  text: {
    color: '#4E5C80',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
  },

  topContain: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  root: {padding: 20, minHeight: 200},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 5},
  cell: {
    width: 60,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#E9ECF4',
    textAlign: 'center',
    backgroundColor: '#F1F3FA',
    borderRadius: 10,
    paddingTop: 5,
  },
  focusCell: {
    borderColor: '#F1F3FA',
  },

  phoneNumber: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '500',
    color: COLORS.dark_2,
    //   color:Color.dark_2,
  },
});
