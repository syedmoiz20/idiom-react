import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import flashcardSets from "../flashcardSets.json";

export interface Flashcard {
  question: string;
  answer: string;
}
const FlashcardQuiz: React.FunctionComponent<{ setId: string }> = ({
  setId,
}) => {
  const flashcards: Flashcard[] =
    flashcardSets[setId as keyof typeof flashcardSets];
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => prevIndex + 1);
  };

  const currentFlashcard = flashcards[currentCardIndex];

  const handleToggleAnswer = () => {
    setShowAnswer((prevShowAnswer) => !prevShowAnswer);
  };

  const handlePreviousCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => prevIndex - 1);
  };

  const showPreviousButton = currentCardIndex > 0;
  const showNextButton = currentCardIndex < flashcards.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <TouchableOpacity onPress={handleToggleAnswer}>
          <Text style={styles.question}>{currentFlashcard.question}</Text>
        </TouchableOpacity>
      </View>
      {showAnswer && (
        <View style={styles.answerContainer}>
          <Text style={styles.answer}>{currentFlashcard.answer}</Text>
        </View>
      )}
      {showPreviousButton && (
        <Button title="Previous Card" onPress={handlePreviousCard} />
      )}
      {showNextButton && <Button title="Next Card" onPress={handleNextCard} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  questionContainer: {
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#2691ba",
    height: 80,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  answerContainer: {
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#2691ba",
    height: 60,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  answer: {
    fontSize: 18,
    color: "black",
  },
  buttons: {
    marginBottom: 10,
    color: "#2691ba",
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FlashcardQuiz;
