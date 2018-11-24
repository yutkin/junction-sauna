import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { WebBrowser } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Touchable from 'react-native-platform-touchable';
import Button from '../components/Button';

export default class SaunaView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/sauna.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTextHeading}>Sauna in our house</Text>
          <Text style={styles.infoText}>Yörlikkurli, 26</Text>
          <Text style={styles.infoTextHeading}>Current conditions</Text>
        </View>

        <Button
          text="Book sauna"
          style={styles.btn}
        />
        {/* <Text style={styles.optionsTitleText}>
          Resources
        </Text>

        <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handlePressDocs}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Image
                source={require('./assets/images/expo-icon.png')}
                resizeMode="contain"
                fadeDuration={0}
                style={{ width: 20, height: 20, marginTop: 1 }}
              />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Read the Expo documentation
              </Text>
            </View>
          </View>
        </Touchable>

        <Touchable
          background={Touchable.Ripple('#ccc', false)}
          style={styles.option}
          onPress={this._handlePressSlack}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Image
                source={require('./assets/images/slack-icon.png')}
                fadeDuration={0}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Join us on Slack
              </Text>
            </View>
          </View>
        </Touchable>

        <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handlePressForums}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Ionicons name="ios-chatboxes" size={22} color="#ccc" />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Ask a question on the Expo forums
              </Text>
            </View>
          </View>
        </Touchable> */}
      </View>
    );
  }

//   _handlePressSlack = () => {
//     WebBrowser.openBrowserAsync('https://slack.expo.io');
//   };

//   _handlePressDocs = () => {
//     WebBrowser.openBrowserAsync('http://docs.expo.io');
//   };

//   _handlePressForums = () => {
//     WebBrowser.openBrowserAsync('http://forums.expo.io');
//   };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  btn: {
    // alignSelf: 'center'
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 200
  },
  info: {
    width: '100%',
    paddingRight: 15,
    paddingLeft: 15
  },
  infoText: {
    textAlign: 'right',
    color: '#696969',
    paddingTop: 5
  },
  infoTextHeading: {
    textAlign: 'right',
    fontSize: 20,
    marginTop: 20
  }

//   optionsTitleText: {
//     fontSize: 16,
//     marginLeft: 15,
//     marginTop: 9,
//     marginBottom: 12,
//   },
//   optionIconContainer: {
//     marginRight: 9,
//   },
//   option: {
//     backgroundColor: '#fdfdfd',
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: '#EDEDED',
//   },
//   optionText: {
//     fontSize: 15,
//     marginTop: 1,
//   },
});
