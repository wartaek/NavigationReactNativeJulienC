import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
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
    const isFavorite = favorites.some((favorite) => favorite.idDrink === item.idDrink);
  
    if (isFavorite) {
      const newFavorites = favorites.filter((favorite) => favorite.idDrink !== item.idDrink);
      setFavorites(newFavorites);
    } else {
      const newFavorites = [...favorites, item];
      setFavorites(newFavorites);
    }
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
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("Detail", { cocktail: item })
                }
              >
                <Image
                  source={{
                    uri: `${item.strDrinkThumb}`,
                  }}
                  style={styles.Icon}
                />
                <Text style={styles.textCocktail}>{item.strDrink}</Text>
              </TouchableOpacity>
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
      <View style={styles.bottomBar}>
        <TouchableOpacity title="Home" onPress={() => navigation.navigate("Home")}>
          <Image source={require("../assets/home.png")} />
        </TouchableOpacity>
        <TouchableOpacity title="Profil" onPress={() => navigation.navigate("Profil", { favorites: favorites })}>
          <Image source={require("../assets/profil.png")} />
        </TouchableOpacity>
      </View>
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
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    width: "100%",
  },
});

export default Home;
