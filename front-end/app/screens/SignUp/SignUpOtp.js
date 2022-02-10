import React, {useState, useEffect} from 'react';
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
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;
import {COLORS, SIZES} from '../../constants/index';
import Logo from '../../assets/images/logo.png';

import GradientText from '../../constants/gradientText';
import Button from '../../components/Button';
// import { LinearGradient } from 'expo-linear-gradient';
export default function SignUpOtp({navigation, route}) {
  const [value, setValue] = useState('');
  let clockCall = null;

  let defaultTimer = 10;
  const [countdown, setCountdown] = useState(defaultTimer);
  const [interVal, setInterVal] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  const [enableResend, setEnableResend] = useState(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  const resendOtp = () => {
    if (enableResend) {
      setCountdown(defaultTimer);
      setEnableResend(false);
      clearInterval(clockCall);

      let data = JSON.stringify({
        phone: route.params.phone,
      });

      let config = {
        method: 'post',
        url: 'https://afrirpayuserservice.herokuapp.com/api/v1/auth/resend-otp',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));

          alert('OTP has been resend');
        })
        .catch(function (error) {
          console.log(error);

          alert(error.response.data.message);
        });
    }

    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
  };
  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);

    return () => {
      clearInterval(clockCall);
    };
  });

  const onPress = () => {
    let data = JSON.stringify({
      phone: route.params.phone,
      otp_token: value,
    });
    let config = {
      method: 'post',
      url: 'https://afrirpayuserservice.herokuapp.com/api/v1/auth/verify-otp',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(response => {
        console.log(response.data);

        navigation.navigate('EnterSignupPin', {
          phone: route.params.phone,
          username: route.params.username,
          password: route.params.password,
          otp_token: value,
        });
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data.message);
      });
    // alert(value);
  };

  const params = route.params;
  const [seconds, setSeconds] = useState(60);

  const [text, setText] = React.useState('waiting...');

  console.log(params);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.topContain}>
          <Text style={styles.text}>We’ll text your OTP code</Text>

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
            size="small"
            onPress={onPress}
          />

          <View style={styles.Bottom}>
            {/* didnt otp receive sms */}
            <Text style={styles.BottomText}>Didn't receive SMS?</Text>

            <TouchableOpacity onPress={resendOtp}>
              <Text style={styles.BottomResend}>
                Resend Code in
                <Text
                  style={[
                    styles.resendTimer,
                    {
                      color: enableResend ? 'rgba(78, 92, 128, 1)' : 'gray',
                    },
                  ]}>
                  {' '}
                  (00:{countdown}){' '}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
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
    width: '100%',
  },

  inner: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
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
    color: 'rgba(78, 92, 128, 1)',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
    lineHeight: 22,
  },

  topContain: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  root: {padding: 20, minHeight: 200},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 5},
  cell: {
    width: 40,
    marginLeft: 10,
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

  Bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },

  BottomText: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: '400',
  },

  BottomResend: {
    fontSize: 14,
    fontWeight: '500',
  },

  resendTimer: {
    color: 'rgba(78, 92, 128, 1)',
    fontSize: 14,
  },
});
