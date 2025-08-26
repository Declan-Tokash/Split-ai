import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BalanceOverviewProps {
  totalSplit: number;
  tip: string;
}

export default function BalanceOverview({ totalSplit, tip }: BalanceOverviewProps) {
  return (
    <View style={styles.card}>
      {/* Total Split Section */}
      <View style={styles.row}>
        <Ionicons name="cash-outline" size={28} color="green" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.label}>Total Amount Split</Text>
          <Text style={styles.amount}>${totalSplit.toFixed(2)}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Tip Section */}
      <View style={styles.tipRow}>
        <Ionicons name="bulb-outline" size={22} color="#F59E0B" />
        <Text style={styles.tip}>{tip}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "gray",
  },
  amount: {
    fontSize: 30,
    fontWeight: "700",
    color: "black",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tip: {
    fontSize: 14,
    marginLeft: 8,
    color: "#374151",
    flexShrink: 1,
  },
});
