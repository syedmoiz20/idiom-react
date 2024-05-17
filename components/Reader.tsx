import React, { useEffect, useState } from "react";
import { View, Text } from "./Themed";
import { TouchableOpacity, Modal, StyleSheet } from "react-native";
import { getStoryRDB } from "../lib/supabaseClient";

const Reader: React.FunctionComponent<{ storyId: string }> = ({ storyId }) => {
  const [selectedWord, setSelectedWord] = useState("");
  const [storyText, setStoryText] = useState<string>("");
  useEffect(() => {
    const getStory = async () => {
      const res = await getStoryRDB(storyId);
      setStoryText(res);
      console.log(`storyText: ${JSON.stringify(storyText)}`);
    };
    getStory();
  }, []);
  //   const storyText: string = storyTexts[storyId as keyof typeof storyTexts];
  const storyWords = storyText.split(" ");
  // Replace this with your actual data source (e.g., API response)
  const lexicalInfo = {
    مرحبًا: "Hello",
    بك: "with you",
    في: "in",
    تطبيق: "application",
    القراءة: "reading",
    هذا: "this",
    نص: "text",
    عربي: "Arabic",
    مثالي: "example",
  };

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
  };

  return (
    <View style={styles.container}>
      <View style={styles.arabicText}>
        {storyWords.map((word) => (
          <TouchableOpacity key={word} onPress={() => handleWordClick(word)}>
            <Text style={styles.arabicWord}>{word} </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Modal visible={selectedWord !== ""} animationType="slide">
        <View style={styles.modalContent}>
          <Text>
            {selectedWord &&
              lexicalInfo[selectedWord as keyof typeof lexicalInfo]}
          </Text>
          <TouchableOpacity onPress={() => setSelectedWord("")}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  arabicWord: {
    fontSize: 30,
    textAlign: "right",
    marginBottom: 16,
    marginVertical: 4,
  },
  arabicText: {
    flexDirection: "row-reverse", // Display words horizontally
    flexWrap: "wrap", // Allow words to wrap to the next line
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    color: "blue",
    marginTop: 16,
  },
});

export default Reader;
