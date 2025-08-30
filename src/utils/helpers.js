// Utility functions
export const formatCurrency = amount => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const getMonthKey = dateString => {
  return dateString.substring(0, 7); // YYYY-MM format
};

export const calculateMonthlyTotal = (expenses, selectedDate) => {
  const monthKey = getMonthKey(selectedDate);
  let total = 0;

  Object.keys(expenses).forEach(date => {
    if (date.startsWith(monthKey)) {
      expenses[date].forEach(expense => {
        total += expense.amount;
      });
    }
  });

  return total;
};
