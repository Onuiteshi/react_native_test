import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const Card = ({ item }) => {
  return (
    <TouchableOpacity
      style={{
        marginBottom: 20,
        width: 170,
        height: 250,
        borderRadius: 15,
        alignItems: "center",
        backgroundColor: "#fff",
        elevation: 2,
      }}
      // onPress={() => console.log(item.description)}
    >
      <View
        style={{
          backgroundColor: "#fff",

          width: 170,
          borderRadius: 15,
        }}
      >
        <Image
          source={{ uri: item.photo }}
          resizeMode="cover"
          style={{
            height: 150,
            width: 170,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />
        <View style={{ marginVertical: 10, marginLeft: 20 }}>
          <Text style={{ fontWeight: "700", fontSize: 24 }}>{item.name}</Text>
          <Text style={{ marginTop: 30, color: "#D3D3D3", fontSize: 14 }}>
            ${item.purchasePrice}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({});
