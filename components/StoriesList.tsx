import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome5";

const stories = ["sample"];

export default function StoriesList() {
  const handleImportClick = () => {
    console.log("Import button clicked!");
  };
  return (
    <ScrollView style={styles.container}>
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
      <TouchableOpacity onPress={handleImportClick} style={styles.plusButton}>
        <FontAwesome name="plus" color={"white"} size={28} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
  plusButton: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    marginTop: "5%",
    marginHorizontal: "85%",
    borderRadius: 25,
    backgroundColor: "#2691ba", // Customize the button color
  },
});
