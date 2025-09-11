import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from './Header';
import { CalendarComponent } from './CalendarComponent';
import { SummaryComponent } from './SummaryComponent';
import { ExpensesList } from './ExpensesList';
import { AddExpenseModal } from './AddExpenseModal';
import { DeveloperInfoModal } from './DeveloperInfoModal';
import { ExpenseStorage } from '../services/ExpenseStorage';
import { calculateMonthlyTotal } from '../utils/helpers';
import { colors } from '../theme/colors';

export const AppContent = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const [expenses, setExpenses] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().substring(0, 7), // YYYY-MM format
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [dateActionModalVisible, setDateActionModalVisible] = useState(false);
  const [showExpenses, setShowExpenses] = useState(true);
  const [devInfoVisible, setDevInfoVisible] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [loading, setLoading] = useState(true);

  // Load expenses on app start
  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const loadedExpenses = await ExpenseStorage.getExpenses();
      setExpenses(loadedExpenses);
    } catch (error) {
      Alert.alert('Error', 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleDatePress = useCallback(day => {
    setSelectedDate(day.dateString);
    setDateActionModalVisible(true);
  }, []);

  const handleMonthChange = useCallback(month => {
    setCurrentMonth(month.dateString.substring(0, 7)); // YYYY-MM format
  }, []);

  const handleAddExpense = async () => {
    if (!expenseAmount || isNaN(parseFloat(expenseAmount))) {
      Alert.alert('Invalid Input', 'Please enter a valid amount');
      return;
    }

    try {
      const updatedExpenses = await ExpenseStorage.addExpense(
        selectedDate,
        expenseAmount,
        expenseDescription,
      );
      setExpenses(updatedExpenses);
      setExpenseAmount('');
      setExpenseDescription('');
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to save expense');
    }
  };

  const handleDeleteExpense = async expenseId => {
    try {
      const updatedExpenses = await ExpenseStorage.deleteExpense(
        selectedDate,
        expenseId,
      );
      setExpenses(updatedExpenses);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete expense');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setExpenseAmount('');
    setExpenseDescription('');
    setShowExpenses(true);
  };

  const selectedDateExpenses = expenses[selectedDate] || [];
  const monthlyTotal = calculateMonthlyTotal(expenses, currentMonth + '-01');
  const selectedDateTotal = selectedDateExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top,
          backgroundColor: colors.background,
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <KeyboardAvoidingView>
        <Header onInfoPress={() => setDevInfoVisible(true)} />

        <CalendarComponent
          selectedDate={selectedDate}
          onDatePress={handleDatePress}
          onMonthChange={handleMonthChange}
          expenses={expenses}
        />

        <SummaryComponent
          currentMonth={currentMonth}
          monthlyTotal={monthlyTotal}
          selectedDate={selectedDate}
          selectedDateTotal={selectedDateTotal}
        />

        {showExpenses && (
          <ExpensesList
            expenses={selectedDateExpenses}
            onDeleteExpense={handleDeleteExpense}
          />
        )}

        <AddExpenseModal
          visible={modalVisible}
          selectedDate={selectedDate}
          expenseAmount={expenseAmount}
          expenseDescription={expenseDescription}
          onAmountChange={setExpenseAmount}
          onDescriptionChange={setExpenseDescription}
          onAddExpense={handleAddExpense}
          onCancel={handleModalCancel}
        />

        {/* Date Action Modal */}
        {dateActionModalVisible && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 999,
            }}
          >
            <View
              style={{
                backgroundColor: colors.surface,
                padding: 24,
                borderRadius: 16,
                minWidth: 250,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 18,
                  color: colors.onSurface,
                }}
              >
                What would you like to do?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text
                    style={{
                      backgroundColor: colors.primary,
                      color: '#fff',
                      textAlign: 'center',
                      paddingVertical: 12,
                      borderRadius: 8,
                      fontWeight: 'bold',
                    }}
                    onPress={() => {
                      setShowExpenses(true);
                      setModalVisible(false);
                      setDateActionModalVisible(false);
                    }}
                  >
                    View Expenses
                  </Text>
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text
                    style={{
                      backgroundColor: colors.secondary,
                      color: '#fff',
                      textAlign: 'center',
                      paddingVertical: 12,
                      borderRadius: 8,
                      fontWeight: 'bold',
                    }}
                    onPress={() => {
                      setShowExpenses(false);
                      setModalVisible(true);
                      setDateActionModalVisible(false);
                    }}
                  >
                    Add Expense
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  marginTop: 18,
                  color: colors.onSurfaceVariant,
                  textAlign: 'center',
                }}
                onPress={() => setDateActionModalVisible(false)}
              >
                Cancel
              </Text>
            </View>
          </View>
        )}

        <DeveloperInfoModal
          visible={devInfoVisible}
          onClose={() => setDevInfoVisible(false)}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
