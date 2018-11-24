import React from 'react';
import { StyleSheet, Image, Text, View, Switch, DatePickerIOS } from 'react-native';
import TableView from 'react-native-tableview';
import DatePicker from 'react-native-datepicker';

const { Section, Item } = TableView

export default class BookSaunaView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeFrom: new Date(),
      timeTo: new Date(),
      date: new Date()
    }
  }

  render() {
    return (
      <View>
        <TableView
          style={{ width: '100%', height: 500 }}
          // allowsToggle
          // allowsMultipleSelection
          tableViewStyle={TableView.Consts.Style.Grouped}
          tableViewCellStyle={TableView.Consts.CellStyle.Value1}
          // onPress={event => console.log(event)}
        >
          <Section>
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
                placeholder="select date"
                format="LT"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={datePickerStyles}
                onDateChange={(date) => {this.setState({date})}}
              />
            </TableView.Cell>
          </Section>

          <Section label="Select time">
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
                  placeholder="select date"
                  format="LT"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={datePickerStyles}
                  onDateChange={(timeFrom) => {this.setState({timeFrom})}}
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
                placeholder="select date"
                format="LT"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={datePickerStyles}
                onDateChange={(timeTo) => {this.setState({timeTo})}}
              />
            </TableView.Cell>
          </Section>

          <Section>
            <TableView.Cell
              style={{
                flexDirection: 'row',
                height: 44,
                paddingLeft: 16,
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Text style={[{fontSize: 18}, {backgroundColor: 'transparent', flex: 1}]}>
                Let everyone join me
              </Text>
              <Switch
                style={{marginRight: 16}}
                // value={this.props.lowLightMode}
                // onValueChange={this.handleSwitchChange}
              />
            </TableView.Cell>
          </Section>
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
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // paddingLeft: 20,
    // paddingRight: 20
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'stretch', // This sets width of TableView to zero
  }
});
