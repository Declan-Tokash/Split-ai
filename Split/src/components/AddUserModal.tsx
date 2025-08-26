// AddUserModal.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type AddUserModalProps = {
  visible: boolean;
  onClose: () => void;
  onAddUser: (name: string) => void;
};

const AddUserModal: React.FC<AddUserModalProps> = ({
  visible,
  onClose,
  onAddUser,
}) => {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAddUser(name.trim());
    setName("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New User</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: "#ccc" }]} onPress={onClose}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: "black" }]} onPress={handleAdd}>
              <Text style={{ color: "#fff" }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddUserModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
