import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    text: string;
    icon?: keyof typeof Ionicons.glyphMap;
    onPress:() => void;
    variant: 'dark' | 'light';
};

export default function CustomButton({
    onPress,
    text,
    icon,
    variant
  }: Props) {
    const variantStyles = variant === 'dark' ? dark : light;
  
    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, variantStyles.button]}>
        <View style={styles.iconTextWrapper}>
          {icon && <Ionicons name={icon} size={24} color={variantStyles.text.color} style={{ marginRight: 8 }} />}
          <Text style={[styles.buttonText, variantStyles.text]}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  const styles = StyleSheet.create({
    button: {
      flex: 1,
      paddingVertical: 20, 
      borderRadius: 24,
      alignItems: 'center',
    },
    iconTextWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonText: {
      fontWeight: '600',
      fontSize: 18,
    },
  });
  
  const dark = StyleSheet.create({
    button: {
      backgroundColor: 'black',
    },
    text: {
      color: 'white',
    },
  });
  
  const light = StyleSheet.create({
    button: {
      backgroundColor: 'white',
      borderWidth: 1.2,
      borderColor: 'black',
    },
    text: {
      color: 'black',
    },
  });
  
