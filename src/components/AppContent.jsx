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
    setModalVisible(true);
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

        <ExpensesList
          expenses={selectedDateExpenses}
          onDeleteExpense={handleDeleteExpense}
        />

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
