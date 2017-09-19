import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';

import style from '../style';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: "Settings",
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="settings"
        size={30}
        color={tintColor}
      />
    ),
    headerTintColor: style.white,
    headerStyle: { backgroundColor: style.grey }
  };

  onButtonPress = () => {
    this.props.clearLikedJobs();
    this.props.navigation.navigate('review');
  }

  onHelpButtonPress = () => {
    this.props.navigation.navigate('welcome');
  }

  render() {
    return (
      <View style={style.flexOneDarkBG}>
        <Button
          title="Clear liked jobs"
          icon={{ name: 'delete-forever' }}
          containerViewStyle={{ marginTop: 10 }}
          large
          backgroundColor={style.dangerRed}
          onPress={this.onButtonPress}
        />
        <Button
          title="Umm, what's this app again?"
          icon={{ name: 'help' }}
          large
          containerViewStyle={{ marginTop: 10 }}
          backgroundColor={style.primaryBlue}
          onPress={this.onHelpButtonPress}
        />
      </View>
    );
  }
}

export default connect(null, { clearLikedJobs })(SettingsScreen);
