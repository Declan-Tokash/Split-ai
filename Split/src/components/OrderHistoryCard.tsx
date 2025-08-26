import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useOrderListStore } from "../stores/useOrderListStore";
import { useReceiptStore } from "../stores/useOrderStore";

export default function OrderHistoryCard() {

  const router = useRouter()
  const orders = useOrderListStore(state => state.orders)

  const handleSplitOrder = (id: string, name: string, date: string, tip: number) => {
    useReceiptStore.getState().setId(id)
    useReceiptStore.getState().setStoreName(name)
    useReceiptStore.getState().setDate(date)
    useReceiptStore.getState().setTip(tip)
    router.push('/(split)/split')
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {/* Left side (details) */}
          <View style={styles.leftSide}>
            <Text style={styles.place}>{item.name.length < 10 ? item.name :  item.name.substring(0, 15) + "..."}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.total}>${item.total.toFixed(2)}</Text>
          </View>

          {/* Right side (buttons) */}
          <View style={styles.rightSide}>
            <TouchableOpacity onPress={() => handleSplitOrder(item._id, item.name, item.date, item.tip)} style={[styles.button, styles.splitButton]}>
              <Text style={styles.splitText}>Split</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.splitEvenlyButton]}>
              <Text style={styles.splitEvenlyText}>Split Evenly</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  leftSide: {
    flex: 1,
  },
  place: {
    fontSize: 16,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    color: "gray",
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: "gray",
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
  },
  rightSide: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  button: {
    width: 130, // 👈 ensures both buttons are the same width
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 6,
  },
  splitButton: {
    backgroundColor: "#6C63FF",
  },
  splitText: {
    color: "white",
    fontWeight: "600",
  },
  splitEvenlyButton: {
    borderWidth: 1,
    borderColor: "black",
  },
  splitEvenlyText: {
    fontWeight: "600",
  },
});

