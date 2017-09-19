import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, Dimensions } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import Swipe from '../components/Swipe';
import * as actions from '../actions';
import style from '../style';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="thumbs-up-down"
        size={30}
        color={tintColor}
      />
    )
  }

  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      longitudeDelta: 0.02,
      latitudeDelta: 0.045
    };
    const {
      jobtitle, company, formattedRelativeTime, snippet
    } = job;
    const formattedJobTitle = jobtitle.length > 40 ? `${jobtitle.substring(0, (40 - 3))}...` : jobtitle;

    return (
      <Card
        title={formattedJobTitle}
        titleStyle={{ fontSize: 20 }}
        containerStyle={{ height: 480 }}
      >
        <View style={{ height: 220 }}>
          <MapView
            cacheEnabled
            style={{ flex: 1 }}
            scrollEnabled={false}
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
        <Text>
          {snippet.replace(/<\/?b>/g, '')}
        </Text>
        <View style={style.swipeInstructionsWrapper}>
          <Text style={style.swipeInstruction}>{"<< Dismiss"}</Text>
          <Text style={style.swipeInstruction}>{"Save >>"}</Text>
        </View>
      </Card>
    );
  }

  renderNoMoreCards = () => (
    <Card
      title="Nope, nothing here..."
      backgroundColor={style.grey}
      wrapperStyle={{ justifyContent: 'space-between' }}
      titleStyle={{ fontSize: 22, color: style.white }}
    >
      <Image
        source={require('../assets/images/404.gif')}
        resizeMode='cover'
        style={{ height: (SCREEN_HEIGHT / 2), marginBottom: 20 }}
      />
      <Button
        large
        title="Go back to the map"
        icon={{ name: 'map' }}
        backgroundColor={style.primaryBlue}
        onPress={() => this.props.navigation.navigate('map')}
      />
    </Card>
  );

  render() {
    return (
      <View>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
          onSwipeLeft={job => this.props.dismissJob(job)}
          keyProp="jobkey"
        />
      </View>
    );
  }
}

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);
