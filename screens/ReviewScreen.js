import React, { Component } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';

import style from '../style';

class ReviewScreen extends Component {
  // 'static' applies to the class
  // - add customisation options for this particular screen here
  // take the "navigate" function off the navigator object (the default param)
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;

    return ({
      title: 'Shortlist',
      headerTitle: "Jobs you've shortlisted",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="format-list-bulleted"
          size={30}
          color={tintColor}
        />
      ),
      headerStyle: { backgroundColor: style.grey },
      headerTitleStyle: { color: style.white },
      headerRight: (
        <Icon
          name='settings'
          onPress={() => { navigate('settings') }}
          color={style.white}
          style={{ paddingRight: 15 }}
        />
      )
    });
  };

  removeJob(job) {
    this.props.dismissJob(job);
  }

  renderLikedJobs() {
    return this.props.likedJobs.map((job) => {
      const {
        jobtitle, jobkey, company, url, snippet,
        formattedRelativeTime, longitude, latitude
      } = job;
      const initialRegion = {
        longitude,
        latitude,
        longitudeDelta: 0.02,
        latitudeDelta: 0.045
      };

      return (
        <Card title={jobtitle} titleStyle={{ fontSize: 20 }} key={jobkey}>
          <View style={{ height: 150 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={ true }
              scrollEnabled={ false }
              initialRegion={initialRegion}
            />
          </View>
          <View style={style.detailWrapper}>
            <Text style={style.companyText}>
              {company}
            </Text>
            <Text style={style.daysText}>
              {formattedRelativeTime}
            </Text>
          </View>
          <Text style={style.jobDescription}>
            {snippet.replace(/<\/?b>/g, '')}
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
            <Icon
              reverse
              name="close"
              color={style.dangerRed}
              onPress={() => this.removeJob(job)}
            />
            <Icon
              reverse
              name="launch"
              color={style.primaryBlue}
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <View style={style.flexOneDarkBG}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {this.renderLikedJobs()}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps({ likedJobs }) {
  return { likedJobs };
}

export default connect(mapStateToProps, actions)(ReviewScreen);
