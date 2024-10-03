import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const CalendarList = [
  { date: "SUN", number: "1" },
  { date: "MON", number: "2" },
  { date: "TUE", number: "3" },
  { date: "WED", number: "4" },
  { date: "THU", number: "5" },
  { date: "FRI", number: "6" },
  { date: "SAT", number: "7" },
  { date: "|", number: "" },
  { date: "SUN", number: "8" },
  { date: "MON", number: "9" },
  { date: "TUE", number: "10" },
  { date: "WED", number: "11" },
  { date: "THU", number: "12" },
  { date: "FRI", number: "13" },
  { date: "SAT", number: "14" },
  { date: "|", number: "" },
  { date: "SUN", number: "15" },
  { date: "MON", number: "16" },
  { date: "TUE", number: "17" },
  { date: "WED", number: "18" },
  { date: "THU", number: "19" },
  { date: "FRI", number: "20" },
  { date: "SAT", number: "21" },
  { date: "|", number: "" },
  { date: "SUN", number: "22" },
  { date: "MON", number: "23" },
  { date: "TUE", number: "24" },
  { date: "WED", number: "25" },
  { date: "THU", number: "26" },
  { date: "FRI", number: "27" },
  { date: "SAT", number: "28" },
];

export default function App() {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View>
        <Text style={{ fontSize: 15, padding: 10 }}>Feb 2024</Text>
      </View>
      <View style={styles.calendarContentCss}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CalendarList.map((calendar, index) => (
            <TouchableOpacity>
              <View style={styles.calendarBoxCss} key={index}>
                <View style={styles.calendarCard}>
                  <Text style={styles.fontSizeCalendar}>{calendar.date}</Text>
                  <Text style={styles.calendarCss}>{calendar.number}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 0,
  },
  fontSizeCalendar: {
    fontSize: 15,
    fontWeight: 600,
  },
  calendarContentCss: {
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    shadowColor: "#000",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 100,
    padding: 10,
    margin: 5,
  },
  calendarCss: { fontSize: 30, fontWeight: 900, color: "#5D5D5D" },
  calendarBoxCss: {
    paddingVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginHorizontal: 15,
  },
  calendarCard: {
    gap: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
