import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import TipButton from './TipButton';
import { useReceiptStore } from '../stores/useOrderStore';

interface TipSelectorProps {
  selectedTip: number | null;
  onTipChange: (tip: number) => void;
}

const TipSelector: React.FC<TipSelectorProps> = ({ selectedTip, onTipChange }) => {
  const [customValue, setCustomValue] = useState('');
  const [active, setActive] = useState<number | 'custom' | null>(selectedTip);
  const total = useReceiptStore(state => state.total) ?? 0

  const handleSelect = (value: number | 'custom') => {
    setActive(value);
  
    if (value === 'custom') {
      setCustomValue('');
      return;
    }
  
    const tipAmount = (total * value) / 100;
    onTipChange(tipAmount);
  };
  
  const handleCustomInput = (text: string) => {
    setCustomValue(text);
    const num = parseFloat(text);
    if (!isNaN(num)) {
      onTipChange(num); // custom tip is already an absolute amount
    }
  };
  

  return (
    <View style={styles.container}>
      {[15, 20, 25].map((percent) => (
        <TipButton
          key={percent}
          label={`${percent}%`}
          active={active === percent}
          onPress={() => handleSelect(percent)}
        />
      ))}
      <TipButton
        label="Custom"
        active={active === 'custom'}
        onPress={() => handleSelect('custom')}
      />

      {active === 'custom' && (
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          placeholder="$0.00"
          value={customValue}
          onChangeText={handleCustomInput}
          returnKeyType="done"
        />
      )}
    </View>
  );
};

export default TipSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
  },
  input: {
    marginTop: 10,
    borderColor: '#ccc',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 120,
    fontSize: 18,
    color: '#000',
    backgroundColor: '#f9f9f9',
    textAlign: 'right', // Money formatting
  },  
});
