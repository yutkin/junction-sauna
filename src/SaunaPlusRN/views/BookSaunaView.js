import React from 'react';
import { StyleSheet, Image, Text, View, Switch, DatePickerIOS, AlertIOS } from 'react-native';
import TableView from 'react-native-tableview';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import * as api from '../api';

export default class BookSaunaView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeFrom: null,
      timeTo: null,
      date: new Date(),
      public: false
    }
  }

  componentDidMount() {
    this.setState({minuteInterval: 15});
  }

  getDateFrom() {
    const time = moment(this.state.timeFrom, 'hh:mm a');
    return moment(this.state.date)
      .hours(time.hours())
      .minutes(time.minutes())
      .seconds(0)
      .format('Y-M-D HH:mm:ss');
  }

  getDateTo() {
    const time = moment(this.state.timeTo, 'hh:mm a');
    return moment(this.state.date)
      .hours(time.hours())
      .minutes(time.minutes())
      .seconds(0)
      .format('Y-M-D HH:mm:ss');
  }

  async bookSauna() {
    if (!this.state.timeFrom || !this.state.timeTo) {
      alert('Please select time first');
      return;
    }

    await api.book(
      this.getDateFrom(),
      this.getDateTo()
    );

    alert('You have booked this sauna.');

    this.props.navigation.navigate('Sauna', {refresh: true});
  }

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
              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={{fontSize: 26, textAlign: 'center'}}>Sauna in our house</Text>
                <Text style={{fontSize: 18, color: '#303030', textAlign: 'center', marginTop: 10}}>Yörlikkurli, 26</Text>
              </View>
            </TableView.Cell>
          </TableView.Section>

          <TableView.Section label="Timetable">
            <TableView.Item
              detail="19:00 — 19:45"
              onPress={() => AlertIOS.alert('Request recorded', 'The sauna is booked by Tom of Finland. You will receive notification if he accepts your request.')}
            >Tom of Finland (Public)</TableView.Item>
            <TableView.Item detail="20:00 — 20:30">Hazol Forward</TableView.Item>
          </TableView.Section>

          <TableView.Section>
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
              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={{fontSize: 18}}>Date</Text>
              </View>
              <DatePicker
                style={{width: 250}}
                date={this.state.date}
                mode="date"
                placeholder="--:--"
                format="ll"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={datePickerStyles}
                onDateChange={(date) => {this.setState({date})}}
              />
            </TableView.Cell>
          </TableView.Section>

          <TableView.Section label="Select time">
            <TableView.Cell
              style={{
                // flexDirection: 'row',
                height: 44,
                paddingLeft: 16,
                paddingRight: 16,
                // justifyContent: 'space-between',
                // alignItems: 'center'
              }}
            >
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                  <Text style={{fontSize: 18}}>From</Text>
                </View>
                <DatePicker
                  style={{width: 250}}
                  date={this.state.timeFrom}
                  mode="time"
                  placeholder="--:--"
                  format="LT"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={datePickerStyles}
                  onDateChange={(timeFrom) => {this.setState({timeFrom})}}
                  minuteInterval={15}
                />
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
              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={{fontSize: 18}}>To</Text>
              </View>
              <DatePicker
                style={{width: 250}}
                date={this.state.timeTo}
                mode="time"
                placeholder="--:--"
                format="LT"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={datePickerStyles}
                onDateChange={(timeTo) => {this.setState({timeTo})}}
                minuteInterval={15}
              />
            </TableView.Cell>
          </TableView.Section>

          <TableView.Section>
            <TableView.Cell
              style={{
                flexDirection: 'row',
                height: 44,
                paddingLeft: 16,
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Text style={[{fontSize: 18, backgroundColor: 'transparent', flex: 1}]}>
                Let everyone join me
              </Text>
              <Switch
                style={{marginRight: 16}}
                value={this.state.public}
                onValueChange={() => this.setState({public: !this.state.public})}
              />
            </TableView.Cell>
          </TableView.Section>

          <TableView.Section>
            <TableView.Cell
              style={{
                flexDirection: 'row',
                height: 44,
                paddingLeft: 16,
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onPress={() => this.bookSauna()}
            >
              <Text style={{fontSize: 18, color: '#2f8fe2'}}>
                Confirm booking
              </Text>
            </TableView.Cell>
          </TableView.Section>
        </TableView>
      </View>
    );
  }
}

const datePickerStyles = {
  dateTouchBody: {
    height: 44
  },
  dateIcon: {
    display: 'none'
  },
  btnText: {
    paddingHorizontal: 0,
    height: 44,
  },
  dateInput: {
    borderWidth: 0,
    alignItems: 'flex-end',
    height: 44,
  },
  btnTextText: {
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btn: {

  },
});
