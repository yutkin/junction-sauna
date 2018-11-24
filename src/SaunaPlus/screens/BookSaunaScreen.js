import React from 'react';
import { ScrollView, StyleSheet, Switch, Text } from 'react-native';
// import SaunaView from '../views/SaunaView';
// import TableView from 'react-native-tableview';

// console.log(TableView);

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
      <ScrollView style={styles.container}>
        {/* <SaunaView /> */}
        {/* <TableView.Cell style={{
  flexDirection: 'row',
  height: 44,
  paddingLeft: 16,
  justifyContent: 'space-between',
  alignItems: 'center'
}}>
          <Text style={[{}, {backgroundColor: 'transparent', flex: 1}]}>Enable Low Light Mode</Text>
          <Switch
            style={{marginRight: 16}}
            // value={this.props.lowLightMode}
            // onValueChange={this.handleSwitchChange}
          />
        </TableView.Cell> */}
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
