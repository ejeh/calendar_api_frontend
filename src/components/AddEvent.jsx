import React, { Component } from "react";
import { connect } from "react-redux";
import { App } from "./date_time_picker";
import { creatEvents } from "../actions/action_create_event";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";

const { height, width } = Dimensions.get("window");

const initialState = {
  summary: "",
  location: "",
  description: "",
  start: new Date(),
  end: new Date(),
  show: false,
  mode: "date",
  time: new Date(),
  showEnd: false,
};
class AddEvent extends Component {
  state = {
    ...initialState,
  };

  _handleStart = (event, selectedValue) => {
    this.setState({ show: Platform.OS === "ios" });
    const { mode } = this.state;
    if (mode == "date") {
      const currentDate = selectedValue || new Date();
      this.setState({
        start: currentDate,
      });
      this.setState({
        mode: "time",
      });

      this.setState({ show: Platform.OS !== "ios" }); // to show the picker again in time mode
    } else {
      const selectedTime = selectedValue || new Date();
      this.setState({ time: selectedTime });
      this.setState({ show: Platform.OS === "ios" });
      this.setState({
        mode: "date",
      });
    }
  };

  _handleEnd = (event, selectedValue) => {
    this.setState({ showEnd: Platform.OS === "ios" });
    const { mode } = this.state;
    if (mode == "date") {
      const currentDate = selectedValue || new Date();
      this.setState({
        end: currentDate,
      });
      this.setState({
        mode: "time",
      });

      this.setState({ showEnd: Platform.OS !== "ios" }); // to show the picker again in time mode
    } else {
      const selectedTime = selectedValue || new Date();
      this.setState({ time: selectedTime });
      this.setState({ showEnd: Platform.OS === "ios" });
      this.setState({
        mode: "date",
      });
    }
  };

  showMode = (currentMode) => {
    this.setState({
      show: true,
      mode: currentMode,
    });
  };

  showDatePicker = () => {
    this.showMode("date");
  };

  showEndMode = (currentMode) => {
    this.setState({
      showEnd: true,
      mode: currentMode,
    });
  };
  showEndDatePicker = () => {
    this.showEndMode("date");
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  _handleSummary = (text) => {
    this.setState({ summary: text });
  };

  _handlelocation = (text) => {
    this.setState({ location: text });
  };

  _handleDescription = (text) => {
    this.setState({ description: text });
  };

  handleSubmit = () => {
    const { creatEvents } = this.props;
    const { summary, location, description, start, end } = this.state;
    creatEvents({ summary, location, description, start, end });
    this.clearState();
  };

  render() {
    const {
      summary,
      location,
      description,
      start,
      end,
      time,
      show,
      mode,
      showEnd,
    } = this.state;

    const formatDate = (start, time) => {
      return `${start.getDate()}/${
        start.getMonth() + 1
      }/${start.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
    };

    const formatEndDate = (end, time) => {
      return `${end.getDate()}/${
        end.getMonth() + 1
      }/${end.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
    };

    return (
      <LinearGradient style={styles.container} colors={["#DA4453", "#892168"]}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.appTitle}>Add Event</Text>
        <ScrollView style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"Title"}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            value={summary}
            onChangeText={this._handleSummary}
          />
          <TextInput
            style={styles.input}
            placeholder={"Location"}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            value={location}
            onChangeText={this._handlelocation}
          />
          <TextInput
            style={styles.input}
            placeholder={"Description"}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            value={description}
            onChangeText={this._handleDescription}
          />
          <View>
            <TouchableOpacity onPress={this.showDatePicker}>
              <Text style={styles.title}>Start</Text>
              <Text style={styles.timeFormat}>{formatDate(start, time)}</Text>
            </TouchableOpacity>
            <View
              style={{
                borderBottomColor: "lightgray",
                borderBottomWidth: 1,
              }}
            />
            <TouchableOpacity onPress={this.showEndDatePicker}>
              <Text style={styles.title}>End</Text>
              <Text style={styles.timeFormat}>{formatEndDate(end, time)}</Text>
            </TouchableOpacity>

            {show && (
              <View>
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={start}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={this._handleStart}
                />
              </View>
            )}

            <View>
              {showEnd && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={end}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={this._handleEnd}
                />
              )}
            </View>
          </View>
          <View>
            <Button onPress={this.handleSubmit} title="submit" />
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4fade6",
    alignItems: "center",
    // justifyContent: "center",
  },
  appTitle: {
    color: "#fff",
    fontSize: 36,
    marginTop: 60,
    marginBottom: 30,
    fontWeight: "300",
  },

  card: {
    backgroundColor: "#fff",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {},
      android: {
        elevation: 5,
      },
    }),
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 24,
  },
  timeFormat: {
    color: "darkgray",
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "300",
    marginLeft: 20,
  },
  title: {
    color: "darkgray",
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "300",
    marginLeft: 20,
  },
});

const mapStateToProps = (state) => ({
  addEvents: state.addEvents,
});

const mapDispatchStateToProps = (dispatch) => ({
  creatEvents: (data) => {
    dispatch(creatEvents(data));
  },
});

export default connect(mapStateToProps, mapDispatchStateToProps)(AddEvent);
