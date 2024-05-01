import React from "react";
import { StyleSheet } from "react-native";

import { View } from "./Themed";
import HomePageButton from "./HomePageButtons";

export default function EditScreenInfo() {
  return (
    <View style={styles.homeContainer}>
      <HomePageButton text="vocab" path="/vocab" />
      <HomePageButton text="grammar" path="/vocab" />
      <HomePageButton text="story teller" path="/vocab" />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flexWrap: "wrap",
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
