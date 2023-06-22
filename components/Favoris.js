import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

const Favoris = ({ navigation, route }) => {
  const favorites = JSON.parse(route.params.favorites);

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
          {favorites.favorites.length > 0 ? (
            favorites.favorites.map((item) => (
              <View key={item.idDrink} style={styles.viewCocktail}>
                <Image
                  source={{
                    uri: `${item.strDrinkThumb}`,
                  }}
                  style={styles.Icon}
                />
                <Text style={styles.textCocktail}>{item.strDrink}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.textCocktail}>Vous n'avez aucun favori.</Text>
          )}
        </ScrollView>
        <StatusBar style="auto" />
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity
          title="Home"
          onPress={() => navigation.navigate("Home")}
        >
          <Image source={require("../assets/home.png")} />
        </TouchableOpacity>
        <TouchableOpacity title="Go Back" onPress={() => navigation.goBack()}>
          <Image source={require("../assets/back.png")} />
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
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    height: 60,
    width: "100%",
  },
});

export default Favoris;
