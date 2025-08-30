import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { colors } from '../theme/colors';
import { CustomDay } from './CustomDay';

export const CalendarComponent = ({
  selectedDate,
  onDatePress,
  onMonthChange,
  expenses,
}) => {
  // Create marked dates for selected date highlighting
  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: '#007bff',
    },
  };

  return (
    <View style={styles.calendarContainer}>
      <Calendar
        style={[styles.calendar, { backgroundColor: colors.surface }]}
        onDayPress={onDatePress}
        onMonthChange={onMonthChange}
        markedDates={markedDates}
        dayComponent={({ date, state, marking, onPress }) => (
          <CustomDay
            date={date}
            state={state}
            marking={marking}
            onPress={onPress}
            expenses={expenses}
          />
        )}
        theme={{
          backgroundColor: colors.surface,
          calendarBackground: colors.surface,
          textSectionTitleColor: colors.onSurfaceVariant,
          arrowColor: colors.primary,
          disabledArrowColor: colors.onSurfaceVariant,
          monthTextColor: colors.onSurface,
          indicatorColor: colors.primary,
          textDayFontFamily: 'System',
          textMonthFontFamily: 'System',
          textDayHeaderFontFamily: 'System',
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 14,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  calendarContainer: {
    position: 'relative',
  },
});
