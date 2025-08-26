import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or react-native-vector-icons

interface HeaderProps {
  name?: string;
  onProfilePress?: () => void;
  profileImage?: string; // optional profile image
}

export default function Header({ name = "Declan", onProfilePress, profileImage }: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* Left side (welcome text) */}
      <View>
        <Text style={styles.welcome}>Welcome back,</Text>
        <Text style={styles.name}>{name}</Text>
      </View>

      {/* Right side (profile button) */}
      <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Ionicons name="person-circle-outline" size={40} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcome: {
    fontSize: 14,
    color: "gray",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 2,
  },
  profileButton: {
    borderRadius: 50,
    overflow: "hidden",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
});
