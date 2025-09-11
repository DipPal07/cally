import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const CustomAlertModal = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onCancel}
  >
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.cancel]}
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.confirm]}
            onPress={onConfirm}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    minWidth: 260,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.error,
  },
  message: {
    fontSize: 16,
    color: colors.onSurface,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancel: {
    backgroundColor: colors.onSurfaceVariant,
  },
  confirm: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
