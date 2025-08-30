import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { formatCurrency } from '../utils/helpers';

export const SummaryComponent = ({
  currentMonth,
  monthlyTotal,
  selectedDate,
  selectedDateTotal,
}) => {
  return (
    <View
      style={[styles.summaryContainer, { backgroundColor: colors.surface }]}
    >
      <Text style={[styles.summaryTitle, { color: colors.onSurface }]}>
        {new Date(currentMonth + '-01').toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
        })}
        - Month Summary
      </Text>
      <Text style={[styles.monthTotal, { color: colors.success }]}>
        Month Total: {formatCurrency(monthlyTotal)}
      </Text>
      {selectedDate && (
        <>
          <Text
            style={[
              styles.summaryTitle,
              { marginTop: 10, color: colors.onSurface },
            ]}
          >
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Text style={[styles.dayTotal, { color: colors.primary }]}>
            Day Total: {formatCurrency(selectedDateTotal)}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  dayTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  monthTotal: {
    fontSize: 18,
    fontWeight: '600',
  },
});
