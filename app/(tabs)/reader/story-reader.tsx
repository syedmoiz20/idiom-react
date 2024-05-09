import { StyleSheet } from "react-native";

import { View } from "../../../components/Themed";
import Reader from "../../../components/Reader";
import { useLocalSearchParams } from "expo-router";

export default function flashcardSet() {
  const { selectedStory } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Reader storyId={selectedStory as string} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
