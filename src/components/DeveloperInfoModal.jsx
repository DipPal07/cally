import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';

export const DeveloperInfoModal = ({ visible, onClose }) => {
  const handleLinkedInPress = () => {
    const linkedinUrl = 'https://www.linkedin.com/in/dip-kumar-pal-9a571a260/';
    Linking.openURL(linkedinUrl).catch(err => {
      Alert.alert(
        'Cannot Open Link',
        'LinkedIn Profile: https://www.linkedin.com/in/dip-kumar-pal-9a571a260/',
        [{ text: 'OK', style: 'default' }],
      );
    });
  };
  const handleGitHubPress = () => {
    const gitHubUrl = 'https://github.com/DipPal07';
    Linking.openURL(gitHubUrl).catch(err => {
      Alert.alert(
        'Cannot Open Link',
        'LinkedIn Profile: https://github.com/DipPal07',
        [{ text: 'OK', style: 'default' }],
      );
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[styles.devInfoContent, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.devInfoTitle, { color: colors.onSurface }]}>
            👨‍💻 Developer Info
          </Text>

          <View style={styles.devInfoSection}>
            <Text
              style={[styles.devInfoLabel, { color: colors.onSurfaceVariant }]}
            >
              Developed by:
            </Text>
            <Text style={[styles.devInfoName, { color: colors.primary }]}>
              Dip Kumar Pal
            </Text>
          </View>

          <View style={styles.devInfoSection}>
            <Text
              style={[styles.devInfoLabel, { color: colors.onSurfaceVariant }]}
            >
              LinkedIn:
            </Text>
            <TouchableOpacity onPress={handleLinkedInPress}>
              <Text style={[styles.devInfoLink, { color: colors.secondary }]}>
                linkedin.com/in/dip-kumar-pal
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.devInfoSection}>
            <Text
              style={[styles.devInfoLabel, { color: colors.onSurfaceVariant }]}
            >
              GitHub:
            </Text>
            <TouchableOpacity onPress={handleGitHubPress}>
              <Text style={[styles.devInfoLink, { color: colors.secondary }]}>
                https://github.com/DipPal07
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.devInfoCloseButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={onClose}
          >
            <Text style={styles.devInfoCloseText}>Close</Text>
          </TouchableOpacity>
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
  // Developer Info Modal Styles
  devInfoContent: {
    padding: 30,
    borderRadius: 20,
    width: '85%',
    maxWidth: 350,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    alignItems: 'center',
  },
  devInfoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  devInfoSection: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  devInfoLabel: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  devInfoName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  devInfoLink: {
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
    paddingVertical: 5,
  },
  devInfoCloseButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  devInfoCloseText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
