import { router } from "expo-router";
import React from "react";
import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";

const FlashcardSets = ["quiz1", "animals"];

const FlashcardSetList = () => {
  return (
    <View>
      {FlashcardSets.map((setId) => (
        <View style={styles.boxButton} key={setId}>
          <Text
            style={styles.buttonText}
            onPress={() => {
              router.push({
                pathname: "/(tabs)/vocab/flashcardSet",
                params: { selectedSet: setId },
              });
            }}
          >
            {setId}
          </Text>
        </View>
      ))}
    </View>
  );
};

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

export default FlashcardSetList;
