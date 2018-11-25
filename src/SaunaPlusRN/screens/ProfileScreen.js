import React from 'react';
import { StyleSheet, Image, Text, View, Switch, DatePickerIOS, AlertIOS } from 'react-native';
import TableView from 'react-native-tableview';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
        backgroundColor: '#FF463A',
    },
    headerTintColor: '#FFF',
  };

  render() {
    return (
      <View style={styles.container}>
        <TableView
          style={{ width: '100%', flex: 1 }}
          tableViewStyle={TableView.Consts.Style.Grouped}
          tableViewCellStyle={TableView.Consts.CellStyle.Value1}
        >
          <TableView.Section>
            <TableView.Cell
              style={{
                height: 170,
                paddingHorizontal: 16
              }}
            >
              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{
                  height: 84,
                  width: 84,
                  borderTopLeftRadius: 84,
                  borderTopRightRadius: 84,
                  borderBottomLeftRadius: 84,
                  borderBottomRightRadius: 84,
                  overflow: 'hidden'
                }}>
                  <Image
                    source={require('../assets/images/tom.png')}
                    resizeMode="contain"
                    style={{width: '100%', height: '100%'}}
                  ></Image>
                </View>
                <Text style={{fontSize: 26, textAlign: 'center', marginTop: 10}}>Tom of Sauna</Text>
              </View>
            </TableView.Cell>
          </TableView.Section>

          <TableView.Section arrow>
            <TableView.Item detail="21 Aug 1956">Date of birth</TableView.Item>
            <TableView.Item detail="Male">Sex</TableView.Item>
            <TableView.Item detail="82 kg">Weight</TableView.Item>
          </TableView.Section>

          <TableView.Section arrow>
            <TableView.Item detail="Yörlikkurli, 26">Sauna</TableView.Item>
          </TableView.Section>
        </TableView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});
