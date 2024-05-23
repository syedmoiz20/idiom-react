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
import { generateStoryAssistant } from "../lib/genStories";

export default function StoriesList() {
  const [stories, setStories] = useState<string[]>([]);
  // const [generatedStoryText, setGeneratedStoryText] = useState<string>("");
  // const [generatedStoryTitle, setGeneratedStoryTitle] = useState<string>("");
  useEffect(() => {
    const getStories = async () => {
      const res = await listStoriesRDB(true);
      setStories(res);
    };
    getStories();
  }, []);
  const handleImportClick = () => {
    setFormIsVisible(true);
  };
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [storyPrompt, setStoryPrompt] = useState("");
  const handleSubmit = async () => {
    const genStory = async () => {
      const { body, title } = await generateStoryAssistant(storyPrompt);
      setStoryPrompt("");
      return { body, title };
    };
    const { body, title } = await genStory();
    uploadStoryRDB(body, title, true);
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
            style={styles.storyPrompt}
            placeholder="Enter the topic to generate your story"
            value={storyPrompt}
            onChangeText={(storyPrompt) => setStoryPrompt(storyPrompt)}
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
  storyPrompt: {
    marginTop: "20%",
    height: "40%",
    fontSize: 15,
    fontWeight: "bold",
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
function genStory(storyPrompt: string) {
  throw new Error("Function not implemented.");
}
