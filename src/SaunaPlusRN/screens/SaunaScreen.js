import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import SaunaView from '../views/SaunaView';

export default class SaunaScreen extends React.Component {
  static navigationOptions = {
    title: 'Sauna',
    headerStyle: {
        backgroundColor: '#FF463A',
    },
    headerTintColor: '#FFF',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <SaunaView {...this.props} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
