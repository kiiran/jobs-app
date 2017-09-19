import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { MapView, Location, Permissions } from 'expo';
import { connect } from 'react-redux';

import * as actions from '../actions';
import style from '../style';

class MapScreen extends Component {
  static navigationOptions = {
    title: "Map",
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="map"
        size={30}
        color={tintColor}
      />
    )
  }

  state = {
    // Default to false, so the spinner shows first
    mapLoaded: false,
    region: {
      longitude: -1.53,
      latitude: 54.9,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04
    },
    jobSearchText: ""
  }

  componentWillMount() {
    this.getLocation();
  }

  componentDidMount() {
    // After it's fully loaded (mounted), we change the
    // state here. React detects the status change, which
    // re-renders the MapScreen, displaying the map properly
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onChangeText = (jobSearchText) => {
    this.setState({ jobSearchText });
  }

  onSearchIconPress = () => {
    this.props.fetchJobs(this.state, () => {
      this.props.navigation.navigate('deck');
    });
  }

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') { return }

    let { coords } = await Location.getCurrentPositionAsync({});

    const { latitude, longitude } = coords;
    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04
    };
    this.setState({ region });
    return true;
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: style.grey }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={style.flexOne}>
        <MapView
          style={style.flexOne}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={style.mapSearchContainer} >
          <SearchBar
            noIcon
            onChangeText={this.onChangeText}
            placeholder='What do you wanna do from 9 to 5?' />
        </View>
        <View style={style.mapButtonContainer} >
          <Icon
            reverse
            size={30}
            name='my-location'
            color={style.primaryBlue}
            onPress={this.getLocation}
          />
          <Icon
            reverse
            size={30}
            name='search'
            color={style.primaryBlue}
            onPress={this.onSearchIconPress}
          />
        </View>
      </View>
    );
  }
}

export default connect(null, actions)(MapScreen);
