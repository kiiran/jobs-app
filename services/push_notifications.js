import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import axios from 'axios';

// Replace this with whatever URL will handle the push notifications
const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  let previousToken = await AsyncStorage.getItem('push_token');
  // To see what the token is:
  // console.log(previousToken);
  if (previousToken) { return }

  let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
  if (status !== "granted") {
    return;
    // I think it'd be worth adding something here to stop
    // the user from being asked again after saying "no"
  }

  let token = await Notifications.getExpoPushTokenAsync();
  await axios.post(PUSH_ENDPOINT, { token: { token } });
  AsyncStorage.setItem('push_token', token);
};
