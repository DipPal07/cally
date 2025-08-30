import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

// Custom Day Component to show expense amounts
export const CustomDay = ({ date, state, marking, onPress, expenses }) => {
  const dayExpenses = expenses[date.dateString] || [];
  const dayTotal = dayExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const hasExpenses = dayTotal > 0;

  const isSelected = state === 'selected';
  const isToday = state === 'today';
  const isDisabled = state === 'disabled';

  const containerStyle = [
    styles.customDayContainer,
    { backgroundColor: isSelected ? colors.primary : 'transparent' },
    isToday && { borderColor: colors.primary, borderWidth: 2 },
    hasExpenses && {
      backgroundColor: isSelected ? colors.primary : colors.surfaceVariant,
      borderWidth: 1,
      borderColor: colors.primary,
    },
  ];

  const textStyle = [
    styles.customDayText,
    {
      color: isSelected
        ? '#ffffff'
        : isToday
        ? colors.primary
        : colors.onSurface,
    },
    isDisabled && { color: colors.onSurfaceVariant },
  ];

  const expenseTextStyle = [
    styles.customDayExpense,
    { color: isSelected ? '#ffffff' : colors.primary },
  ];

  const handlePress = () => {
    if (onPress && !isDisabled) {
      onPress(date);
    }
  };

  return (
    <TouchableOpacity
      style={[
        containerStyle,
        hasExpenses &&
          hasExpenses && {
            borderColor:
              dayTotal > 200
                ? '#dc2626' // red-600
                : dayTotal > 100
                ? '#f59e0b' // amber-500
                : '#22c55e', // green-500
          },
        ,
      ]}
      onPress={handlePress}
      disabled={isDisabled}
    >
      <Text style={textStyle}>{date.day}</Text>
      {hasExpenses && (
        <Text style={expenseTextStyle}>
          {new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(dayTotal)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Custom day component styles
  customDayContainer: {
    width: 35,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    borderRadius: 10,
  },
  selectedDay: {},
  todayDay: {
    borderWidth: 2,
  },
  expenseDay: {
    borderWidth: 1.5,
  },
  customDayText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  selectedDayText: {
    fontWeight: 'bold',
  },
  todayDayText: {
    fontWeight: 'bold',
  },
  disabledDayText: {
    opacity: 0.3,
  },
  customDayExpense: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -1,
    letterSpacing: 0.2,
  },
  selectedDayExpenseText: {},
});
