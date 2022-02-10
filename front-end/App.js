import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {Onboarding}

import checkIfFirstLaunch from './app/utils/checkIfFirstLaunch';
import {AuthContext} from './app/context/AuthContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import AuthNavigator from './app/navigation/AuthNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Onboarding} from './app/screens/index';

import AppNavigator from './app/navigation/AppNavigator';

import jwt_decode from 'jwt-decode';

import 'react-native-gesture-handler';

// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then(response => {
    console.log('Fetch', {request: {uri, options, ...args}, response});
    return response;
  });
};

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        const userToken = String(foundUser.token);
        const userName = foundUser.user_data.username;

        try {
          await AsyncStorage.setItem('userToken', userToken);
          // setitem user data
          await AsyncStorage.setItem(
            'userData',
            JSON.stringify(foundUser.user_data),
          );
        } catch (e) {
          console.log(e);
        }

        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 400);
  }, []);

  useEffect(() => {
    // decode token

    // function to logut if token expired
    const LogoutIfTokenExpired = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        console.log(new Date(decoded.exp * 1000), 'time to expire');

        if (decoded.exp < currentTime) {
          console.log('Token expired.', decoded.exp * 1000);

          // logout
          authContext.signOut();
        }
      } catch (e) {
        console.log(e);
      }
    };

    LogoutIfTokenExpired();
  }, []);

  useEffect(() => {
    // check if first launch
    checkIfFirstLaunch().then(isFirstLaunch => {
      setIsFirstLaunch(isFirstLaunch);
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  }

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          {/* {loginState.userToken !== null ? <AppNavigator /> : <AuthNavigator />} */}
          <AppNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </AuthContext.Provider>
  );
}
