import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator,CardStyleInterpolators } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import DetailedScreen from "./screens/DetailedScreen";

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>

          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DetailedScreen" component={DetailedScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;