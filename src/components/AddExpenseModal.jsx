import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../theme/colors';

export const AddExpenseModal = ({
  visible,
  selectedDate,
  expenseAmount,
  expenseDescription,
  onAmountChange,
  onDescriptionChange,
  onAddExpense,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[styles.modalContent, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.modalTitle, { color: colors.onSurface }]}>
            Add Expense
          </Text>
          <Text style={[styles.modalDate, { color: colors.onSurfaceVariant }]}>
            {new Date(selectedDate).toLocaleDateString()}
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
                color: colors.onSurface,
              },
            ]}
            placeholder="Amount"
            placeholderTextColor={colors.onSurfaceVariant}
            value={expenseAmount}
            onChangeText={onAmountChange}
            keyboardType="decimal-pad"
            autoFocus
          />

          <TextInput
            style={[
              styles.input,
              styles.textArea,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
                color: colors.onSurface,
              },
            ]}
            placeholder="Description (optional)"
            placeholderTextColor={colors.onSurfaceVariant}
            value={expenseDescription}
            onChangeText={onDescriptionChange}
            multiline
            numberOfLines={3}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
                { backgroundColor: colors.onSurfaceVariant },
              ]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.addButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={onAddExpense}
            >
              <Text style={styles.addButtonText}>Add Expense</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    margin: 20,
    padding: 25,
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  modalDate: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    opacity: 0.8,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 18,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cancelButton: {},
  addButton: {},
  cancelButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  addButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
