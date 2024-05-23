import {
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
import { listStoriesRDB, uploadStoryRDB } from "../lib/supabaseClient";

export default function StoriesList() {
  const [stories, setStories] = useState<string[]>([]);
  useEffect(() => {
    const getStories = async () => {
      const res = await listStoriesRDB(false);
      setStories(res);
    };
    getStories();
  }, []);
  const handleImportClick = () => {
    setFormIsVisible(true);
  };
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [importStoryText, setImportStoryText] = useState("");
  const [importStoryTitle, setImportStoryTitle] = useState("");
  const handleSubmit = () => {
    const saveToDB = async () => {
      await uploadStoryRDB(importStoryText, importStoryTitle, false);
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
      <Modal visible={formIsVisible} animationType="slide">
        <View style={styles.storyForm}>
          <TextInput
            style={styles.storyTitleInput}
            placeholder="Title your story"
            value={importStoryTitle}
            onChangeText={(newTitle) => setImportStoryTitle(newTitle)}
          />
          <TextInput
            style={styles.storyTextInput}
            placeholder="Type or paste in the story text"
            value={importStoryText}
            onChangeText={(newText) => setImportStoryText(newText)}
          />
          <View style={styles.boxControlButton}>
            <Text style={styles.controlButtonText} onPress={handleSubmit}>
              Submit
            </Text>
          </View>
          <View style={styles.boxControlButton}>
            <Text
              style={styles.controlButtonText}
              onPress={() => {
                setFormIsVisible(false);
              }}
            >
              Close
            </Text>
          </View>
        </View>
      </Modal>
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
  storyForm: {
    flex: 1,
  },
  storyTitleInput: {
    marginTop: "20%",
    height: "auto",
    fontSize: 15,
    fontWeight: "bold",
    color: "gray",
  },
  storyTextInput: {
    fontSize: 15,
    fontWeight: "bold",
    height: "70%",
    color: "gray",
  },

  boxControlButton: {
    backgroundColor: "#2691ba",
    borderRadius: 8,
    justifyContent: "flex-end",
  },
  controlButtonText: {
    color: "black",
    fontSize: 20,
    paddingBottom: "5%",
  },
});
