import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";

const Home = ({ navigation }) => {
  const [cocktail, setCocktail] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";

  const fetchCocktail = useCallback(() => {
    axios
      .get(url)
      .then((res) => {
        setCocktail(res.data.drinks);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    fetchCocktail();
  }, [fetchCocktail]);

  const addFavori = (item) => {
    const newFavorites = favorites.some((favorite) => favorite.id === item.id)
     ? favorites.filter((favorite) => favorite.id!== item.id)
      : [...favorites, item];
    setFavorites(newFavorites);
  };

  if (!cocktail) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={styles.background}>
      <Image
        source={{
          uri: "https://e1.pxfuel.com/desktop-wallpaper/719/393/desktop-wallpaper-cocktail-for-android.jpg",
        }}
        style={styles.backgroundImage}
      ></Image>
      <View style={styles.container}>
        <ScrollView>
          {cocktail.map((item) => (
            <View key={item.idDrink} style={styles.viewCocktail}>
              <Image
                source={{
                  uri: `${item.strDrinkThumb}`,
                }}
                style={styles.Icon}
              />
              <Text style={styles.textCocktail}>{item.strDrink}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addFavori(item)}
              >
                <Image
                  source={
                    favorites.includes(item)
                    ? require("../assets/heartred.png")
                    : require("../assets/heart.png")
                  }
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <StatusBar style="auto" />
      </View>
      <Button title="Profil" onPress={() => navigation.navigate("Profil", { favorites: favorites})} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  Icon: {
    marginTop: 10,
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  viewCocktail: {
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "#f5f5dc36",
    borderColor: "grey",
    borderRadius: 5,
    borderWidth: 2,
    width: 250,
    height: 275,
    marginBottom: 20,
  },
  textCocktail: {
    color: "orange",
    fontSize: 30,
  },
  button: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "transparent",
    borderRadius: 50,
    padding: 10,
  },
});

export default Home;