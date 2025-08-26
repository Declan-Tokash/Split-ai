import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserTotalCard from '../../components/UserTotalCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddUserModal from '../../components/AddUserModal';
import ActionBar from '../../components/ActionBar';
import { useRouter } from 'expo-router';
import { useReceiptStore } from '../../stores/useOrderStore';
import { getOrderById } from '../../services/GetOrderById';
import { Item, Order } from '../home';

export default function Split() {
  const [assignments, setAssignments] = useState<{ [key: string]: string[] }>({});
  const [usersData, setUsersData] = useState<{ id: string; name: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const orderId = useReceiptStore((state) => state.id) ?? ""
  const orderName = useReceiptStore((state) => state.storeName) ?? ""
  const orderDate = useReceiptStore((state) => state.date) ?? ""
  const orderTip = useReceiptStore((state) => state.tip) ?? 0
  const [items, setItems] = useState<Item[]>([]);
  const [userTip, setUserTip] = useState<number>(0);

  useEffect(() => {
    if(!orderId) return;
    const fetchOrder = async () => {
      try {
        const data: Order = await getOrderById(orderId);
        setItems(data.items);
      } catch (err) {
        console.error("Failed to fetch order", err);
      }
    };

    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    if(usersData?.length > 0){
      const tip = orderTip / usersData.length
      setUserTip(tip)
    }
  })

  const addUser = (name: string) => {
    const newUser = { id: Date.now().toString(), name };
    setUsersData([...usersData, newUser]);
  };

  const deleteUser = (id: string) => {
    setUsersData(usersData.filter(user => user.id !== id));
  };

  const toggleUserAssignment = (itemId: string, userId: string) => {
    setAssignments(prev => {
      const current = prev[itemId] || [];
      if (current.includes(userId)) {
        return { ...prev, [itemId]: current.filter(id => id !== userId) };
      } else {
        return { ...prev, [itemId]: [...current, userId] };
      }
    });
  };

  const getUserTotal = (userId: string) => {
    let total = 0;
    Object.entries(assignments).forEach(([itemId, userIds]) => {
      if (userIds.includes(userId)) {
        const item = items.find(i => i.name === itemId);
        if (item) total += item.price / userIds.length;
      }
    });
    return total;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.storeName}>{orderName}</Text>
        <Text style={styles.date}>{orderDate}</Text>
      </View>

      {/* Assign Items Section */}
      <Text style={styles.title}>Assign Items</Text>
      <FlatList
        style={styles.itemsList}
        data={items}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>
              {item.name} - ${item.price}
            </Text>
            <View style={styles.userRow}>
              {usersData.map(user => {
                const assigned = assignments[item.name]?.includes(user.id);
                return (
                  <TouchableOpacity
                    key={user.id}
                    style={[styles.userButton, assigned && styles.userAssigned]}
                    onPress={() => toggleUserAssignment(item.name, user.id)}
                  >
                    <Text style={[styles.userText, assigned && styles.userAssignedText]}>{user.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      />

      {/* Request Users Section */}
      <View style={styles.usersHeader}>
        <Text style={styles.title}>Request Users</Text>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Ionicons name="add-circle" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.usersList}
        data={usersData}
        keyExtractor={(user) => user.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <UserTotalCard
            id={item.id}
            deleteUser={() => deleteUser(item.id)}
            name={item.name}
            total={getUserTotal(item.id)}
            tip={userTip}
            onPay={() => console.log(`${item.name} pressed Pay!`)}
          />
        )}
      />

      {/* Modals */}
      <AddUserModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddUser={addUser}
      />

      {/* ActionBar */}
      <ActionBar
        buttons={[
          {
            text: 'Complete',
            action: () => router.push('/home'),
            variant: 'dark',
          },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderBottomColor: "#ccc",
  },
  storeName: { fontSize: 32, fontWeight: "700", color: "black" },
  date: { fontSize: 14, color: "#666", marginVertical: 3 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  itemRow: { backgroundColor: "#fff", marginBottom: 14, padding: 10, borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemName: { fontSize: 18, marginBottom: 10 },
  userRow: { flexDirection: 'row', flexWrap: 'wrap' },
  userButton: { padding: 8, margin: 4, borderWidth: 1, fontWeight: 500, borderRadius: 5, borderColor: 'black'},
  userAssigned: { backgroundColor: '#e5e7eb'},
  userText: { fontSize: 14 },
  userAssignedText: {fontSize: 14, fontWeight: 600},
  itemsList: {
    maxHeight: 400, // approx 3 items visible, scrollable
    marginBottom: 10,
  },
  usersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  usersList: {
    maxHeight: 300, // users list scrolls independently
    minHeight: 300
  },
  tip: {
    marginBottom: 10
  }
});

