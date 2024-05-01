import { StyleSheet } from "react-native";

import { View } from "../../../components/Themed";
import FlashcardSetList from "../../../components/FlashcardSetList";

export default function Vocab() {
  return (
    <View style={styles.container}>
      <FlashcardSetList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
