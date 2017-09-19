import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import style from '../style';

class Slides extends Component {
  renderExtras(index) {
    if (index === this.props.data.length - 1) {
      return (
        <View style={style.buttonContainer}>
          <Button
            large
            icon={{ name: 'thumb-up' }}
            title="Onwards!"
            buttonStyle={style.buttonStyle}
            onPress={this.props.onComplete}
          />
        </View>
      );
    }
    if (index === 0) {
      return (
        <View style={style.buttonContainer}>
          <Text style={style.smallInstructionText}>(swipe left)</Text>
        </View>
      );
    }
  }

  renderSlides() {
    return this.props.data.map((slide, i) => {
      return (
        <View
          key={slide.text}
          style={[style.slideStyle, { backgroundColor: slide.color }]}
        >
          <Text style={style.slideText}>
            {slide.text}
          </Text>
          {this.renderExtras(i)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={style.flexOne}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

export default Slides;
