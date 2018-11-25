import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import moment from 'moment';
import Button from '../components/Button';
import * as api from '../api';
import TableView from 'react-native-tableview';

export default class SaunaView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      booking: null,
      conditions: null
    }
  }

  componentDidMount() {
    this.getConditions();
  }

  componentDidUpdate() {
    const {navigation} = this.props;
    if (navigation.state.params && navigation.state.params.refresh) {
      this.getBooking();
      this.getConditions();
    }
  }

  async getConditions() {
    try {
      const conditions = await api.getConditions();
      this.setState({conditions});
    } catch (err) {
      console.log(err);
    }
  }

  async getBooking() {
    try {
      const booking = await api.getLatestBooking();
      if (booking.errors) {
        return;
      }

      this.setState({booking: booking.booking});
    } catch (err) {
      console.log(err);
    }
  }

  async cancelBooking() {
    try {
      await api.cancelBooking();
      this.setState({booking: null});
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    let {conditions} = this.state;

    let bookingFrom;
    let bookingTo;

    if (this.state.booking) {
      bookingFrom = moment(this.state.booking.from);
      bookingTo = moment(this.state.booking.to);
    }

    return (
      // <View style={styles.container}>
      //   <View style={styles.imageContainer}>
      //     <Image
      //       source={require('../assets/images/sauna.png')}
      //       resizeMode="contain"
      //       style={styles.image}
      //     />
      //   </View>

      //   <View style={styles.info}>
      //     <Text style={styles.infoTextHeading}>Sauna in our house</Text>
      //     <Text style={styles.infoText}>Yörlikkurli, 26</Text>
      //     <Text style={styles.infoTextHeading}>Current conditions</Text>
      //   </View>

      //   {Boolean(conditions) && (
      //     <View style={styles.sensorData}>
      //       <View style={conditions.temperature_ok ? styles.sensorDataCircle : styles.sensorDataCircleRed}>
      //         <View style={styles.sensorDataCircleInner}>
      //           <Text style={styles.sensorDataCircleH1}>{Math.round(conditions['Temperature'])}°C</Text>
      //           <Text style={styles.sensorDataCircleH2}>Temperature</Text>
      //         </View>
      //       </View>
      //       <View style={conditions.temperature_ok ? styles.sensorDataCircle : styles.sensorDataCircleRed}>
      //         <View style={styles.sensorDataCircleInner}>
      //           <Text style={styles.sensorDataCircleH1}>{Math.round(conditions['Relative humidity'])}%</Text>
      //           <Text style={styles.sensorDataCircleH2}>Humidity</Text>
      //         </View>
      //       </View>
      //     </View>
      //   )}

      //   {!Boolean(this.state.booking) && (
      //     <Button
      //       text="Book sauna"
      //       style={styles.btn}
      //       onPress={() => this.props.navigation.navigate('BookSauna')}
      //     />
      //   )}

      //   {Boolean(this.state.booking) && (
      //     <React.Fragment>
      //       <View style={{flex: 1, justifyContent: 'center', marginTop: 25}}>
      //         <Text style={{color: '#696969', fontSize: 14}}>
      //           You have booking from {bookingFrom.format('hh:mm')} to {bookingTo.format('hh:mm')}
      //         </Text>
      //       </View>
      //       <Button
      //         text="Cancel booking"
      //         style={styles.btn}
      //         onPress={() => this.cancelBooking()}
      //       />
      //     </React.Fragment>
      //   )}
      // </View>

      <View style={styles.container}>
        <TableView
          style={{ width: '100%', flex: 1 }}
          tableViewStyle={TableView.Consts.Style.Grouped}
          tableViewCellStyle={TableView.Consts.CellStyle.Value1}
        >
          <TableView.Section>
            <TableView.Cell
              style={{
                height: 300,
                paddingHorizontal: 16
              }}
            >
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
              </View>
            </TableView.Cell>
          </TableView.Section>

          {Boolean(conditions) && (
            <TableView.Section label="Current conditions">
              <TableView.Cell
                style={{
                  flexDirection: 'row',
                  height: 44,
                  paddingLeft: 16,
                  paddingRight: 16,
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text style={{fontSize: 18, backgroundColor: 'transparent'}}>
                  Temperature
                </Text>
                <View>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 18, color: '#8E8E93'}}>
                      {Math.round(conditions['Temperature'])}°C
                    </Text>
                    <View style={{
                      marginLeft: 8,
                      width: 12,
                      height: 12,
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                      backgroundColor: '#5BB615'
                    }} />
                  </View>
                </View>
              </TableView.Cell>

              <TableView.Cell
                style={{
                  flexDirection: 'row',
                  height: 44,
                  paddingLeft: 16,
                  paddingRight: 16,
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text style={{fontSize: 18, backgroundColor: 'transparent'}}>
                  Humidity
                </Text>
                <View>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 18, color: '#8E8E93'}}>
                      {Math.round(conditions['Relative humidity'])}%
                    </Text>
                    <View style={{
                      marginLeft: 8,
                      width: 12,
                      height: 12,
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                      backgroundColor: '#5BB615'
                    }} />
                  </View>
                </View>
              </TableView.Cell>
            </TableView.Section>
          )}
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
  },
  btn: {
    marginTop: 25
  },

  imageContainer: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
    marginTop: 16
  },
  image: {
    width: '100%',
    height: 200
  },

  info: {
    width: '100%',
    paddingRight: 15,
    paddingLeft: 15,
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
  },

  sensorData: {
    marginTop: 15,
    alignSelf: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 15,
    paddingLeft: 15,
  },
  sensorDataCircle: {
    marginLeft: 25,
    width: 74,
    height: 74,
    backgroundColor: '#5BB615',
    borderTopLeftRadius: 74,
    borderTopRightRadius: 74,
    borderBottomRightRadius: 74,
    borderBottomLeftRadius: 74,
  },
  sensorDataCircleRed: {
    marginLeft: 25,
    width: 74,
    height: 74,
    backgroundColor: '#FF463A',
    borderTopLeftRadius: 74,
    borderTopRightRadius: 74,
    borderBottomRightRadius: 74,
    borderBottomLeftRadius: 74,
  },
  sensorDataCircleInner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  sensorDataCircleH1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 18
  },
  sensorDataCircleH2: {
    fontSize: 10,
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 10
  },
    sensorDataCircleH1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 18
  },
  sensorDataCircleH2: {
    fontSize: 10,
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 10
  }
});
