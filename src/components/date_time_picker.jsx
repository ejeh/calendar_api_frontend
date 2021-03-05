import React, { useState } from "react";
import {
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export const App = (props) => {
  console.log("props", props.start);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(new Date());

  //   const onChange = (event, selectedDate) => {
  //     const currentDate = selectedDate || date;
  //     setShow(Platform.OS === "ios");
  //     setDate(currentDate);
  //   };

  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === "ios");
    if (mode == "date") {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode("time");
      setShow(Platform.OS !== "ios"); // to show the picker again in time mode
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      setShow(Platform.OS === "ios");
      setMode("date");
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const showTimePicker = () => {
    showMode("time");
  };

  const formatDate = (date, time) => {
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatePicker}>
        <Text style={styles.title}>Start</Text>
        <Text style={styles.timeFormat}>{formatDate(date, time)}</Text>
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
        }}
      />
      <TouchableOpacity onPress={showDatePicker}>
        <Text style={styles.title}>End</Text>
        <Text style={styles.timeFormat}>{formatDate(date, time)}</Text>
      </TouchableOpacity>

      {show && (
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />

          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
