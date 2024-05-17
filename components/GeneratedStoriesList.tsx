import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Text, View } from "./Themed";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import {
  listStories,
  listStoriesRDB,
  uploadStory,
} from "../lib/supabaseClient";

export default function GeneratedStoriesList() {
  const [stories, setStories] = useState<string[]>([]);
  useEffect(() => {
    const getStories = async () => {
      const res = await listStoriesRDB(true);
      setStories(res);
    };
    getStories();
  }, []);
  const handleImportClick = () => {
    console.log("Import button clicked!");
    setFormIsVisible(true);
  };
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [importStoryText, setImportStoryText] = useState("");
  const [importStoryTitle, setImportStoryTitle] = useState("");
  const handleSubmit = () => {
    console.log("Submitted:", { importStoryText, importStoryTitle });
    const saveToDB = async () => {
      await uploadStory(importStoryText, importStoryTitle, true);
    };
    saveToDB();
    setFormIsVisible(false);
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
