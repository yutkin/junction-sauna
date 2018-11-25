import React from 'react';
import PropTypes from 'prop-types';
import Touchable from 'react-native-platform-touchable';
import { StyleSheet, Image, Text, View } from 'react-native';

export default class SaunaView extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  static defaultProps = {
    onPress: () => {}
  }

  render() {
    return (
      <Touchable
        style={this.props.style || {}}
        onPress={(evt) => this.props.onPress(evt)}
      >
        <View style={styles.view}>
          <Text style={styles.text}>
            {this.props.text}
          </Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FF463A',
    paddingTop: 10,
    paddingRight: 40,
    paddingBottom: 10,
    paddingLeft: 40,
    borderRadius: 9
  },
  text: {
    fontSize: 17,
    color: '#FFF',
    textAlign: 'center'
  }
});
