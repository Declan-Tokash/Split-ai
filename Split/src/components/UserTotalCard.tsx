import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Linking } from "react-native";

type UserTotalProps = {
  id: string
  name: string;
  deleteUser: (id: string) => void;
  total: number;
  tip: number;
  onPay?: () => void;
};

const UserTotalCard: React.FC<UserTotalProps> = ({ id, name, deleteUser, total, tip, onPay }) => {
  const grandTotal = total + tip;
  let note = "via@Split";

const handleVenmoRequest = (amount: number, note: string) => {
  const venmoAppUrl = `venmo://paycharge?txn=charge&amount=${amount}&note=${encodeURIComponent(note)}`;

  const venmoWebUrl = `https://venmo.com/?txn=charge&amount=${amount}&note=${encodeURIComponent(note)}`;

  Linking.canOpenURL(venmoAppUrl)
    .then((supported) => {
      if (supported) {
        Linking.openURL(venmoAppUrl);
      } else {
        // open fallback web URL
        Linking.openURL(venmoWebUrl);
      }
    })
    .catch((err) => console.error("An error occurred", err));
};

  return (
    <View style={styles.container}>
  <View style={styles.card}>
    <View style={styles.info}>
      <Text style={styles.name}>{name}</Text>
      <View style={{display:'flex', flexDirection:'row'}}>
        <Text style={styles.detail}>Total: ${total.toFixed(2)}</Text>
        <Text style={styles.detail}> + ${tip.toFixed(2)} Tip</Text>
      </View>
    </View>

    <TouchableOpacity style={styles.button} onPress={() => handleVenmoRequest(grandTotal, note)}>
      <Text style={styles.buttonText}>Request</Text>
    </TouchableOpacity>
  </View>
  <TouchableOpacity style={styles.trash} onPress={() => deleteUser(id)}>
    <Ionicons name="trash-outline" size={24} color="#8B0000" />
  </TouchableOpacity>

</View>
  );
};

export default UserTotalCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingHorizontal: 12,
    marginVertical: 6,
  },
  
  card: { 
    flex: 1,                     // makes card fill remaining width
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  trash: {
    marginLeft: 10,               // spacing between card & trash
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: "#555",
  },
  grandTotal: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
    color: "#2e7d32", // green for emphasis
  },
  button: {
    backgroundColor: "#6C63FF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
