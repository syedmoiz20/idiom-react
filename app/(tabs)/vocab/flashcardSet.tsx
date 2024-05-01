import { StyleSheet } from "react-native";

import { View } from "../../../components/Themed";
import FlashcardQuiz from "../../../components/FlashcardQuiz";
import { useLocalSearchParams } from "expo-router";

export default function flashcardSet(input: string) {
  const { selectedSet } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <FlashcardQuiz setId={selectedSet as string} />
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
