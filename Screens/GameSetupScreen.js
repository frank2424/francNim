import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Picker
} from "react-native";

const GameSetupScreen = ({ navigation }) => {
  const [playerName, setPlayerName] = useState("");
  const [numberOfStacks, setNumberOfStacks] = useState("3");
  const [gameType, setGameType] = useState("regular");
  const [stacksError, setStacksError] = useState(null);

  const handleStartGame = () => {
    if (playerName.trim() === "") {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    const parsedNumberOfStacks = parseInt(numberOfStacks);
    if (
      isNaN(parsedNumberOfStacks) ||
      parsedNumberOfStacks < 3 ||
      parsedNumberOfStacks > 5
    ) {
      setStacksError("Please enter a valid number of stacks (3-5)");
      return;
    }

    if (gameType !== "misere" && gameType !== "regular") {
      Alert.alert("Error", "Please select a game type (misere or regular)");
      return;
    }

    navigation.navigate("SetStacks", {
      playerName,
      numberOfStacks: parsedNumberOfStacks,
      gameType,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game of Nim (Franc Version)</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter your name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPlayerName}
          value={playerName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number of stacks:</Text>
        <Picker
          style={styles.picker}
          selectedValue={numberOfStacks}
          onValueChange={setNumberOfStacks}
        >
          <Picker.Item label="3" value="3" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="7" value="7" />
        </Picker>
        {stacksError && <Text style={styles.error}>{stacksError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Game type:</Text>
        <Picker
          style={styles.picker}
          selectedValue={gameType}
          onValueChange={setGameType}
        >
          <Picker.Item label="Regular" value="regular" />
          <Picker.Item label="Misere" value="misere" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStartGame}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
  },
  picker: {
    height: 40,
  },
  button: {
    backgroundColor: "#5c8ded",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default GameSetupScreen;
