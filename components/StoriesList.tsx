import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { router } from "expo-router";

const stories = ["sample"];

export default function StoriesList() {
  return (
    <View>
      {stories.map((storyId) => (
        <View style={styles.boxButton} key={storyId}>
          <Text
            style={styles.buttonText}
            onPress={() => {
              router.push({
                pathname: "/(tabs)/reader/story-reader",
                params: { selectedStory: storyId },
              });
            }}
          >
            {storyId}
          </Text>
        </View>
      ))}
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
  boxButton: {
    backgroundColor: "#2691ba",
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 30,
  },
});
