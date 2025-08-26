import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TipButtonProps {
  label: string;
  active?: boolean;
  onPress: () => void;
}

const TipButton: React.FC<TipButtonProps> = ({ label, active, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, active && styles.activeButton]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, active && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TipButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
    marginTop: 8,
  },
  activeButton: {
    backgroundColor: 'black',
  },
  buttonText: {
    color: '#000',
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
});
