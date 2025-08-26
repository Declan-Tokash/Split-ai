import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ItemProps = {
  name: string;
  price: number;
};

const Item: React.FC<ItemProps> = ({ name, price }) => {
  return (
    <View style={styles.card}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.detail}>${price.toFixed(2)}</Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  card: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    marginBottom: 12,
  },
  detail: {
    fontSize: 16,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#00BFA6',
    borderRadius: 6,
  },
  editText: {
    color: '#fff',
    fontWeight: '600',
  },
});
