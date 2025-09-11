import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { formatCurrency } from '../utils/helpers';
import { CustomAlertModal } from './CustomAlertModal';

export const ExpensesList = ({ expenses, onDeleteExpense }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const handleDelete = id => {
    setPendingDeleteId(id);
    setAlertVisible(true);
  };

  const confirmDelete = () => {
    if (pendingDeleteId) {
      onDeleteExpense(pendingDeleteId);
      setPendingDeleteId(null);
      setAlertVisible(false);
    }
  };

  const cancelDelete = () => {
    setPendingDeleteId(null);
    setAlertVisible(false);
  };
  return (
    <View
      style={[
        styles.expensesContainer,
        { backgroundColor: colors.surface, marginBottom: 80 },
      ]}
    >
      <Text style={[styles.expensesTitle, { color: colors.onSurface }]}>
        Expenses ({expenses.length})
      </Text>
      {expenses.length > 0 ? (
        <View
          style={styles.expensesList}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {expenses.map(item => (
            <View
              key={item.id}
              style={[styles.expenseItem, { borderBottomColor: colors.border }]}
            >
              <View style={styles.expenseInfo}>
                <Text style={[styles.expenseAmount, { color: colors.error }]}>
                  {formatCurrency(item.amount)}
                </Text>
                {item.description ? (
                  <Text
                    style={[
                      styles.expenseDescription,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    {item.description}
                  </Text>
                ) : null}
                <Text
                  style={[
                    styles.expenseTime,
                    { color: colors.onSurfaceVariant },
                  ]}
                >
                  {new Date(item.timestamp).toLocaleTimeString()}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.deleteButton, { backgroundColor: colors.error }]}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <Text
          style={[styles.noExpensesText, { color: colors.onSurfaceVariant }]}
        >
          No expenses recorded for this date
        </Text>
      )}
      <CustomAlertModal
        visible={alertVisible}
        title="Delete Expense"
        message="Are you sure you want to delete this expense?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  expensesContainer: {
    flex: 1,
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
  expensesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    letterSpacing: 0.3,
  },
  expensesList: {
    flex: 1,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expenseDescription: {
    fontSize: 15,
    marginTop: 4,
  },
  expenseTime: {
    fontSize: 13,
    marginTop: 4,
    opacity: 0.7,
  },
  deleteButton: {
    borderRadius: 20,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  noExpensesText: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 30,
    fontSize: 16,
  },
});
