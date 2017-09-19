import React from 'react';
import { View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Notifications } from 'expo';
import { Provider } from 'react-redux';
import registerForNotifications from './services/push_notifications';
import store from './store';
import style from './style';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      // This line is the same as the following two
      const { data: { text }, origin } = notification;
      // const text = notification.data.text;
      // const origin = notification.origin;
      // * "origin" is to make sure the notification is received "properly",
      //     and has to do with whether the notification was received inside
      //     or outside the app
      // * Read about it.

      if (origin === 'received' && text) {
        // Three arguments for Alert:
        Alert.alert(
          // Title
          'New push notification',
          // Text, which comes from the server
          text,
          [{ text: 'OK' }]
        );
      }
    });
  }

  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, {
        // Navigator options
          tabBarPosition: 'bottom',
          lazy: true,
          tabBarOptions: {
            labelStyle: { fontSize: 12 },
            style: { backgroundColor: style.grey },
            activeTintColor: style.white,
            indicatorStyle: { backgroundColor: style.primaryBlue }
          },
          swipeEnabled: false
        })
      }
    }, {
    // Navigator options
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      lazy: true,
      animationEnabled: true,
      navigationOptions: { tabBarVisible: false },
      tabBarOptions: {
        style: { backgroundColor: style.grey }
      }
    });

    return (
      <Provider store={store}>
        <View style={style.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
