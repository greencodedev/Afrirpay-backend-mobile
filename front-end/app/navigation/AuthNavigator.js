import React, {useState, useEffect} from 'react';
import Login from '../screens/Login/Login';
import {ActivityIndicator, View} from 'react-native';
import EnterLoginPin from '../screens/Login/EnterLoginPin';
import SignUpOtp from '../screens/SignUp/SignUpOtp';
import EnterSignupPin from '../screens/SignUp/EnterSignupPin';
import ConfirmPin from '../screens/SignUp/ConfirmPin';
import Signup from '../screens/SignUp/Signup';
import SignUpSuccess from '../screens/SignUp/SignUpSuccess';
import ReturningUser from '../screens/ReturningUser/Index';
import ReturningUserPin from '../screens/ReturningUser/Pin';

import {Onboarding} from '../screens/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    ); 
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'ReturningUser';
  }

  return (
    <AuthStack.Navigator initialRouteName={routeName}>

<AuthStack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerShadowVisible: false,
          title: '',
        }}
      />
      
      {/* Returning user */}



      <AuthStack.Screen
        name="ReturningUser"
        component={ReturningUser}
        options={{
          headerShadowVisible: false,
          title: '',
        }}
      />

      <AuthStack.Screen
        name="ReturningUserPin"
        component={ReturningUserPin}
        options={{
          headerShadowVisible: false,
          title: '',
        }}
      />

      {/* Returning user end */}

      {/* signup screens */}

      <AuthStack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShadowVisible: false,
          title: '',
        }}
      />
      <AuthStack.Screen
        name="SignUpOtp"
        component={SignUpOtp}
        options={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          title: 'OTP code',
        }}
      />
      <AuthStack.Screen
        name="EnterSignupPin"
        component={EnterSignupPin}
        options={{
          headerShadowVisible: false,
          headerShown: false,
          title: '',
        }}
      />
      <AuthStack.Screen
        name="ConfirmPin"
        component={ConfirmPin}
        options={{
          headerShadowVisible: false,

          title: '',
        }}
      />
      <AuthStack.Screen
        name="SignUpSuccess"
        component={SignUpSuccess}
        options={{
          headerShadowVisible: false,
          headerShown: false,
          title: '',
        }}
      />

      {/* signup screens ends */}

      {/* login screens */}
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShadowVisible: false,
          title: '',
        }}
      />
      <AuthStack.Screen
        name="EnterLoginPin"
        component={EnterLoginPin}
        options={{
          headerShadowVisible: false,
          title: '',
        }}
      />

      {/* login screens end */}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
