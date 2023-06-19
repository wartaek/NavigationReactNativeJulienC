import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

const Profil = ({ navigation, route }) => {
    const favorites = JSON.stringify(route.params);

    console.log(favorites);
  return (
    <View style={styles.background}>
      <Image
        source={{
          uri: "https://e1.pxfuel.com/desktop-wallpaper/719/393/desktop-wallpaper-cocktail-for-android.jpg",
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.container}>
        <Text style={styles.titre}>Julien COPPEL</Text>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZrudgcg5iutw4EY5wzUAh-KhoizeXyi32A&usqp=CAU",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.job}>Developpeur mobile</Text>
        <Text style={styles.description}>
          Yo les potes ! Je suis le génie derrière cette appli de ouf ! En tant
          que boss du développement mobile, j'ai créé cette pépite avec mon
          talent et ma créativité pour vous offrir une expérience mobile qui va
          vous faire kiffer !👌
        </Text>
        <Button
          title=" Vos Favoris"
          onPress={() => navigation.navigate("Favoris", { favorites: favorites})}
        />
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
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    backgroundColor: "white",
    width: 300,
    maxHeight: 400,
    padding: 15,
    borderRadius: 10,
  },
  titre: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "orange",
  },
  job: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "orange",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "orange",
  },
});

export default Profil;
