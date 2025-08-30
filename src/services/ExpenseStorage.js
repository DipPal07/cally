import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage service for modular data management
export const ExpenseStorage = {
  STORAGE_KEY: '@expense_data',

  async getExpenses() {
    try {
      const data = await AsyncStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error loading expenses:', error);
      return {};
    }
  },

  async saveExpenses(expenses) {
    try {
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
      throw error;
    }
  },

  async addExpense(date, amount, description = '') {
    const expenses = await this.getExpenses();
    if (!expenses[date]) {
      expenses[date] = [];
    }
    expenses[date].push({
      id: Date.now().toString(),
      amount: parseFloat(amount),
      description,
      timestamp: new Date().toISOString(),
    });
    await this.saveExpenses(expenses);
    return expenses;
  },

  async deleteExpense(date, expenseId) {
    const expenses = await this.getExpenses();
    if (expenses[date]) {
      expenses[date] = expenses[date].filter(
        expense => expense.id !== expenseId,
      );
      if (expenses[date].length === 0) {
        delete expenses[date];
      }
      await this.saveExpenses(expenses);
    }
    return expenses;
  },
};
