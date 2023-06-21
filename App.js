import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import SetStacks from './Screens/SetStacks';
import GameSetupScreen from './Screens/GameSetupScreen';
import GameScreen from './Screens/GameScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GameSetupScreen">
        <Stack.Screen
          name="GameSetupScreen"
          component={GameSetupScreen}
          options={{ title: 'Set up the game' }} // Set title for GameSetupScreen
        />
        <Stack.Screen
          name="SetStacks"
          component={SetStacks}
          options={{ title: 'Stack elements' }} // Set title for Game and hide the header
        />
         <Stack.Screen name="GameScreen" component={GameScreen}
         options={{ title: 'Have fun!' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbc4b2',
    alignItems: 'center',
    justifyContent: 'flex-start',
   
  },
});
