import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";

const BACKGROUND_COLOR = "#ffffff";
const PRESSED_BACKGROUND_COLOR = "#ffcccc";
const NOTE_COLOR = "#ffffff";
const PRESSED_NOTE_COLOR = "#ffff00";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [pressedNoteId, setPressedNoteId] = useState(null);

  const addNote = () => {
    if (inputText.trim() === "") {
      return;
    }
    
    const newNote = {
      id: Date.now().toString(),
      text: inputText.trim(),
    };
    
    setNotes([...notes, newNote]);
    setInputText(""); 
  };

  const handleNotePress = (noteId) => {
    setPressedNoteId(pressedNoteId === noteId ? null : noteId);
  };

  const handleLongPress = () => {
    Alert.alert("Long Press", "The note is pressed with a delay of 1 sec!");
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput} 
          placeholder="Enter your note"
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Add note" onPress={addNote} />
      </View>
      <View>
        {notes.map((note) => (
          <Pressable 
            key={note.id}
            testID="pressableElem"
            onPress={() => handleNotePress(note.id)}
            onLongPress={handleLongPress}
            delayLongPress={1000}
            style={({ pressed }) => [
              styles.pressableContainer,
              { backgroundColor: pressed ? PRESSED_BACKGROUND_COLOR : BACKGROUND_COLOR }
            ]}
          >
            <Text 
              testID="noteElem" 
              style={[
                styles.noteElem,
                { color: pressedNoteId === note.id ? PRESSED_NOTE_COLOR : NOTE_COLOR }
              ]}
            >
              {note.text}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 28,
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  pressableContainer: {
    margin: 8,
    borderRadius: 12,
  },
  noteElem: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#008000",
    fontSize: 16,
    textAlign: "center",
  },
});
