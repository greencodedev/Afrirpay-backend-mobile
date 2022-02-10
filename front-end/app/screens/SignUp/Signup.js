import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Radio, RadioGroup, Text} from '@ui-kitten/components';
import * as yup from 'yup';
import {Formik} from 'formik';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {
  IconlyProvider,
  Home,
  Notification,
  User,
  Call,
  Phone,
} from 'react-native-iconly';

import axios from 'axios';

// get device unique id
import DeviceInfo from 'react-native-device-info';

const CELL_COUNT = 4;
import {COLORS, SIZES} from '../../constants/index';
import Logo from '../../assets/images/logo.png';

import GradientText from '../../constants/gradientText';
import Button from '../../components/Button';

import PswIcon from '../../assets/images/PasswordIcon.svg';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const phoneRegExp = /^(?=.*\d).{8,}$/;
const userName = /^[a-zA-Z0-9]{6,}$/;

let signUpSchema = yup.object().shape({
  username: yup
    .string()
    .trim('Username name cannot include spaces')
    .strict(true)
    .required()
    .matches(userName, 'Username must be at least 6 characters long'),

  // password: yup
  //   .string()
  //   .required('Please Enter your password')
  //   .matches(/^(?=.*\d).{8,}$/, 'Must Contain at least 8 Characters'),
  phone: yup
    .string()
    .required('Please Enter your Phone Number')
    .matches(phoneRegExp, 'Phone number is not valid'),
});
export default function SignUp({navigation, route}) {
  const [value, setValue] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [checked, setChecked] = React.useState(false);
  const [error, seterror] = useState(false);

  const onPress = () => {
    // alert(value);4
  };


  let deviceId = DeviceInfo.getUniqueId();

  console.log(deviceId, 'device id');

  return (
    <Formik
      initialValues={{username: '', password: 'password123', phone: ''}}
      onSubmit={values => {
        // alert(JSON.stringify(values, null, 2));

        setIsLoading(true);
        let data = JSON.stringify({
          username: values.username,
          phone: values.phone,
          password: values.password,
          device_hash: deviceId,
        });

        let config = {
          method: 'post',
          url: 'https://afrirpayuserservice.herokuapp.com/api/v1/auth/register',
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };

        axios(config)
          .then(response => {
            console.log(JSON.stringify(response.data));

            // setIsLoading(false);
          })
          .then(() => {
            navigation.navigate('SignUpOtp', {
              phone: values.phone,
              username: values.username,
              password: values.password,
            });
          })

          .catch(function (error) {
            alert(error.response.data.message);

            console.log(error);
          });
      }}
      validateOnMount={true}
      validationSchema={signUpSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <View style={styles.topContain}>
                <Image style={styles.logo} source={Logo} />

                <Text style={styles.text}>Create your account</Text>
              </View>

              <View style={styles.signupForm}>
                <View style={styles.signupInputContainer}>
                  <IconlyProvider
                    set="light"
                    primaryColor="#959FBA"
                    secondaryColor="blue"
                    stroke="bold"
                    size="small">
                    <User />
                  </IconlyProvider>
                  <TextInput
                    style={styles.signupinput}
                    placeholder="Username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}></TextInput>
                </View>
                {touched.username && errors.username && (
                  <Text style={styles.error} status="danger">
                    {errors.username}
                  </Text>
                )}
                <View style={styles.signupInputContainer}>
                  <IconlyProvider
                    set="light"
                    primaryColor="#959FBA"
                    secondaryColor="#959FBA"
                    stroke="bold"
                    size="large">
                    <Call />
                  </IconlyProvider>

                  <TextInput
                    keyboardType="numeric"
                    style={styles.signupinput}
                    placeholder="Phone"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}></TextInput>
                </View>
                {touched.phone && errors.phone && (
                  <Text style={styles.error} status="danger">
                    {errors.phone}
                  </Text>
                )}

                {/* <View style={styles.signupInputContainer}> */}
                  {/* <PasswordIcon /> */}

                  {/* <PswIcon /> */}
{/* 
                  <TextInput
                    style={styles.signupinput}
                    secureTextEntry={true}
                    autoCorrect={false}
                    placeholder="Enter Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}></TextInput> */}
                {/* </View> */}
                {/* {touched.password && errors.password && (
                  <Text style={styles.error} status="danger">
                    {errors.password}
                  </Text>
                )} */}

                {/* <View style={styles.termsandcondtioncontainer}>
                  <Radio
                    checked={checked}
                    onChange={nextChecked => setChecked(nextChecked)}></Radio>
                  <Text style={styles.termsandcondtionText}>
                    Agree to{' '}
                    <Text style={styles.tandcLink}> Terms of Service </Text>
                    and<Text style={styles.tandcLink}> Terms of Use </Text>
                  </Text>
                </View> */}
              </View>

              <View>
                <Button
                  text="Sign Up"
                  type="filled"
                  bordered
                  size="large"
                  isDisabled={!isValid}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },

  inner: {
    flex: 1,
    justifyContent: 'space-between',
    // justifyContent: 'center',
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

  signupInputContainer: {
    backgroundColor: COLORS.dark_8,
    borderRadius: 6,
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  signupinput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 15,
    color: '#4E5C80',
    fontWeight: '400',
    fontSize: 14,
  },
  number: {
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 10,
    paddingVertical: 5,
    paddingRight: 8,
    borderRightWidth: 2,
    borderRightColor: '#D3D8E8',
  },

  termsandcondtioncontainer: {
    flexDirection: 'row',
    // justifyContent: 'space-around',

    alignItems: 'center',
    marginVertical: 20,
  },

  termsandcondtionText: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    flex: 1,
  },

  tandcLink: {
    color: '#0645AD',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },

  error: {
    fontSize: 11,
  },
});
