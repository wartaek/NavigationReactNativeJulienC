import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profil from "./components/Profil";
import Home from "./components/Home";
import Favoris from "./components/Favoris";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profil" component={Profil} />
        <Stack.Screen name="Favoris" component={Favoris} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
