import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const Header = ({ onInfoPress }) => {
  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.headerContent}>
        <Text style={[styles.title, { color: colors.onSurface }]}>Cally</Text>
        <TouchableOpacity style={styles.infoButton} onPress={onInfoPress}>
          <Text style={[styles.infoIcon, { color: colors.primary }]}>ⓘ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
    flex: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(129, 140, 248, 0.1)',
  },
  infoIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
