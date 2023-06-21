import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, Modal } from 'react-native';

const GameScreen = ({ route }) => {
  const { stackItems, playerName, gameType } = route.params;
  const [selectedStack, setSelectedStack] = useState(null);
  const [selectedCount, setSelectedCount] = useState("");
  const [updatedStackItems, setUpdatedStackItems] = useState([...stackItems]);
  const [currentPlayer, setCurrentPlayer] = useState(playerName);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    console.log(gameType);
    console.log(`updatedStackItems: ${updatedStackItems}`);
  }, [updatedStackItems]);

  const renderStackVisual = (stackLength) => {
    const stackVisual = new Array(stackLength).fill('📦');
    return `[ ${stackVisual.join(' ')} ]`;
  };

  const handleComputerMove = () => {
    const nimSum = updatedStackItems.reduce((acc, stackSize) => acc ^ stackSize, 0);
  
    let stackIndex = -1;
  
    if (nimSum === 0) {
      // If nimSum is zero, find the first non-empty stack
      
    } else {
      // Find the stack that will result in nimSum becoming zero
      for (let i = 0; i < updatedStackItems.length; i++) {
        const xorResult = updatedStackItems[i] ^ nimSum;
        if (xorResult < updatedStackItems[i]) {
          stackIndex = i;
          break;
        }
      }
  
      // If no such stack is found, make a random move on a non-empty stack
      if (stackIndex === -1) {
        const nonEmptyStacks = updatedStackItems.reduce((acc, stackSize, index) => {
          if (stackSize > 0) {
            acc.push(index);
          }
          return acc;
        }, []);
  
        stackIndex = nonEmptyStacks[Math.floor(Math.random() * nonEmptyStacks.length)];
      }
    }
  
    if (stackIndex === -1) {
      // If no non-empty stack is found, the game has ended
      // You can add your logic here, such as ending the game or displaying a message
      return;
    }
  
    if (gameType === 'misere') {
      // In "misere" game type, the computer makes a move to ensure the nim sum is zero
      const removeCount = updatedStackItems[stackIndex] - (updatedStackItems[stackIndex] ^ nimSum) - 1;
      const newStackItems = [...updatedStackItems];
      newStackItems[stackIndex] -= removeCount;
      setUpdatedStackItems(newStackItems);
    } else {
      // In "regular" game type, the computer makes a move based on the regular nim strategy
      const removeCount = updatedStackItems[stackIndex] - (updatedStackItems[stackIndex] ^ nimSum);
      const newStackItems = [...updatedStackItems];
      newStackItems[stackIndex] -= removeCount;
      setUpdatedStackItems(newStackItems);
    }
  
    setCurrentPlayer(playerName);
  };
  
  

  const handleRemoveElements = () => {
    if (selectedStack === null) {
      alert("Please select a stack.");
      return;
    }

    const selectedStackItems = updatedStackItems[selectedStack];
    const selectedCountValue = parseInt(selectedCount);

    if (selectedStackItems === 0) {
      alert("The selected stack is empty. Please select a different stack.");
      return;
    }

    if (selectedCountValue > selectedStackItems) {
      alert("Selected count is greater than the number of items in the stack. Please try again.");
      return;
    }

    const newStackItems = [...updatedStackItems];
    newStackItems[selectedStack] -= selectedCountValue;
    setUpdatedStackItems(newStackItems);

    setCurrentPlayer(playerName);
    setSelectedStack(null);
    setSelectedCount("");
    setModalVisible(false); // Close the modal

    setTimeout(() => {
      setCurrentPlayer('Computer');
    }, 1000);
  };

  const handleStackItemPress = (index) => {
    if (updatedStackItems[index] === 0) {
      alert("The selected stack is empty. Please select a different stack.");
      return;
    }

    setSelectedStack(index);
    setSelectedCount("");
    setModalVisible(true);
  };

  useEffect(() => {
    if (currentPlayer === 'Computer') {
      setTimeout(handleComputerMove, 1000);
    }
  }, [currentPlayer]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Stack Items:</Text>

      {updatedStackItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.itemContainer}
          onPress={() => handleStackItemPress(index)}
        >
          <Text style={styles.itemText}>
            <Text style={index === 0 ? styles.boldText : null}>Stack {index + 1}: </Text>
            <Text style={styles.stackVisual}>{renderStackVisual(item)}</Text>
          </Text>
        </TouchableOpacity>
      ))}

      {stackItems.length === 0 && (
        <Text style={styles.emptyText}>No stack items found.</Text>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Count:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={selectedCount}
              onChangeText={setSelectedCount}
              placeholder="Enter count"
            />
            <Button title="Remove" onPress={handleRemoveElements} />
          </View>
        </View>
      </Modal>

      <Button title="Remove Elements" onPress={handleRemoveElements} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
  },
  stackVisual: {
    fontSize: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
});

export default GameScreen;
