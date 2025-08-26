import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import OrderHistoryCard from './OrderHistoryCard';

export default function OrderHistory() {
    return (
      <View>
        <View style={styles.orderHeader}>
          <Text style={styles.recentOrders}>Recent Bills</Text>
        </View>
        <OrderHistoryCard/>
      </View>
    );
  }

  const styles = StyleSheet.create({
    orderHeader: {
      display: "flex",
      flexDirection:"row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    },
    recentOrders:{
      color: 'black',
      fontWeight: 'bold',
      fontSize: 20,
    },
  });