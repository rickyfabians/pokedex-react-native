import React from 'react'
import Home from './src/screens/Home'
import Compare from './src/screens/Compare'
import Details from './src/screens/Details'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function App () {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Compare' component={Compare} />
          <Stack.Screen name='Details' component={Details} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
