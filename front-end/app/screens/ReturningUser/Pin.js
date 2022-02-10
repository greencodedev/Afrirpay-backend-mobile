import React, {useState} from 'react';
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
  ImageBackground,
} from 'react-native';

import {Avatar} from '@ui-kitten/components';
import User from '../../assets/images/user.png';
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
import {AuthContext} from '../../context/AuthContext';

// import { LinearGradient } from 'expo-linear-gradient';
export default function Pin({navigation, route}) {
  const [value, setValue] = useState('');
  const {signIn} = React.useContext(AuthContext);

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  let phoneNumber = route.params.phoneNumber;
  let userName = route.params.username;

  const onPress = () => {
    let data = JSON.stringify({
      phone: phoneNumber,
      pin: value,
    });

    let config = {
      method: 'post',
      url: 'https://afrirpayuserservice.herokuapp.com/api/v1/auth/re-validate-pin',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(response => {
        signIn(response.data.data);
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.topContain}>
          <Avatar source={User} size="giant" ImageComponent={ImageBackground} />

          <Text style={styles.loggedInUserName}>{userName}</Text>

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
            text="Login"
            type="filled"
            bordered
            size="large"
            onPress={onPress}
          />

          <Text style={styles.forgetPinText}>Forget your PIN?</Text>
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

  loggedInUserName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.dark_2_0,
    marginTop: 10,
  },

  forgetPinText: {
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '600',
    color: COLORS.dark_2_0,
    fontSize: 14,
  },
});
