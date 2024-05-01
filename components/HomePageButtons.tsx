import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomePageButton({
  text,
  path,
}: {
  text: string;
  path: string;
}) {
  return (
    <View style={styles.boxButton}>
      <Link href={path as `http${string}`} style={styles.buttonText}>
        <Text>{text}</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  boxButton: {
    backgroundColor: "#2691ba", // Set your desired background color
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "black", // Set text color
    fontSize: 30,
  },
});
