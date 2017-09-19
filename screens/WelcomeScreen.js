import _ from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';
import style from '../style';

const SLIDE_DATA = [
  { text: "Welcome to this job app I made!", color: style.primaryBlue },
  { text: "Just tell it what kind of job you want", color: style.darkGrey },
  { text: "move the map to where you want to work", color: style.darkGrey },
  { text: "and press the search button.", color: style.darkGrey },
  { text: "You'll see a list of jobs", color: style.primaryBlue },
  { text: "and you just need to swipe them one way or the other.", color: style.primaryBlue },
  { text: "Swipe jobs you like to the right", color: style.darkGrey },
  { text: "and the rubbish ones to the left.", color: style.darkGrey },
  { text: "Jobs you swipe right will be saved to your shortlist", color: style.primaryBlue },
  { text: "where you'll find the links to apply for them.", color: style.primaryBlue },
  { text: "It's all very simple.", color: style.darkGrey },
  { text: "Kind of.", color: style.darkGrey },
  { text: "Anyhoo, let's get started!", color: style.darkGrey }
];

class WelcomeScreen extends Component {
  state = { token: null };

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.setState({ token });
      this.props.navigation.navigate('map');
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    if (this.state.token) {
      this.props.navigation.navigate('map');
    } else {
      this.props.navigation.navigate('auth');
    }
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    );
  }
}

export default WelcomeScreen;
