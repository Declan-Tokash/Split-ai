import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

type User = {
  id: string;
  name: string;
};

type Item = {
  id: string;
  name: string;
  price: number;
};

type ItemAssignmentListProps = {
  itemsData: Item[];
  usersData: User[];
  assignments: Record<string, string[]>; // { itemId: [userIds] }
  toggleUserAssignment: (itemId: string, userId: string) => void;
};

const ItemAssignmentList: React.FC<ItemAssignmentListProps> = ({
  itemsData,
  usersData,
  assignments,
  toggleUserAssignment,
}) => {
  return (
    <FlatList
      data={itemsData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemRow}>
          <Text style={styles.itemName}>
            {item.name} - ${item.price.toFixed(2)}
          </Text>
          <View style={styles.userRow}>
            {usersData.map((user) => {
              const assigned = assignments[item.id]?.includes(user.id);
              return (
                <TouchableOpacity
                  key={user.id}
                  style={[styles.userButton, assigned && styles.userAssigned]}
                  onPress={() => toggleUserAssignment(item.id, user.id)}
                >
                  <Text style={styles.userText}>{user.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    />
  );
};

export default ItemAssignmentList;

const styles = StyleSheet.create({
  itemRow: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  userRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8, // note: gap works in React Native 0.71+, otherwise use margin
  },
  userButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  userAssigned: {
    backgroundColor: "#4CAF50",
  },
  userText: {
    color: "#000",
  },
});
