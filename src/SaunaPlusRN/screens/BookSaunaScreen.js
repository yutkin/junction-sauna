import React from 'react';
import { ScrollView, StyleSheet, Switch, Text } from 'react-native';
import BookSaunaView from '../views/BookSaunaView';

export default class BookSaunaScreen extends React.Component {
  static navigationOptions = {
    title: 'Book sauna',
    headerStyle: {
        backgroundColor: '#FF463A',
    },
    headerTintColor: '#FFF',
  };

  render() {
    return (
      // <ScrollView style={styles.container}>
        <BookSaunaView {...this.props} />
      // </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 15,
    // backgroundColor: '#fff',
  },
});
