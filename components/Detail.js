import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

const Detail = ({ navigation, route }) => {
  const { cocktail } = route.params;
  const [cocktailDetail, setCocktailDetail] = useState([]);

  useEffect(() => {
    const fetchCocktailDetail = async () => {
      try {
        const response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`
        );
        setCocktailDetail(response.data.drinks[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCocktailDetail();
  }, [cocktail]);

  return (
    <View style={styles.background}>
      <Image
        source={{
          uri: "https://e1.pxfuel.com/desktop-wallpaper/719/393/desktop-wallpaper-cocktail-for-android.jpg",
        }}
        style={styles.backgroundImage}
      ></Image>
      <View style={styles.container}>
        <Image
          source={{ uri: cocktailDetail.strDrinkThumb }}
          style={styles.image}
        />
        <Text style={styles.title}>{cocktailDetail.strDrink}</Text>
        <Text style={styles.subtitle}>Recette :</Text>
        <Text style={styles.text}>{cocktailDetail.strInstructions}</Text>
        <Text style={styles.subtitle}>Ingrédients :</Text>
        <View style={styles.ingredientsContainer}>
          {Object.keys(cocktailDetail)
            .filter(
              (key) => key.startsWith("strIngredient") && cocktailDetail[key]
            )
            .map((key) => (
              <View key={key} style={styles.ingredient}>
                <Image
                  source={{
                    uri: `https://www.thecocktaildb.com/images/ingredients/${cocktailDetail[key]}-Small.png`,
                  }}
                  style={styles.ingredientImage}
                />
                <Text style={styles.ingredientText}>{cocktailDetail[key]}</Text>
              </View>
            ))}
        </View>
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity title="Home" onPress={() => navigation.navigate("Home")}>
          <Image source={require("../assets/home.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#ffffffa1",
    width: "90%",
    maxHeight: "90%",
    borderRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 20,
  },
  ingredientsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  ingredient: {
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
  },
  ingredientImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  ingredientText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  bottomBar: {
    position: "absolute",
    bottom: "0%",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    width: "100%",
  },
});

export default Detail;
