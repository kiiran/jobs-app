import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import facebookKey from '../secrets';

import {
  FB_LOGIN_SUCCESS,
  FB_LOGIN_FAIL
} from './types';

// ~~~ How to use AsyncStorage ~~~
// ~Use keys/values to save data to/read info from the device
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const fbLogin = () => async (dispatch) => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    // Dispatch action saying that we're logged in
    dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
  } else {
    // Start FB login process
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async (dispatch) => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(facebookKey, {
    permissions: ['public_profile']
  });

  // if login fails/gets cancelled
  if (type === 'cancel') {
    return dispatch({ type: FB_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  return dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
};
