import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { View, Text } from "./Themed";

interface EditQuantity {
  productId: string;
  productName: string;
  productQuantity: number;
  uri: string;
}
const EditQuantity: React.FC<EditQuantity> = ({
  productId,
  productName,
  productQuantity,
  uri,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: uri,
        }}
        style={styles.image}
      />
      <View style={styles.textGroup}>
        <Text style={styles.text}>{productId}</Text>
        <Text style={styles.title}>{productName}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.quantityView}>
          <Text style={styles.quantity}>{productQuantity}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const background = "rgb(49, 54, 63)";
const textColor = "rgb(238, 238, 238)";
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
    flex: 2,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: background,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  textGroup: {
    width: "30%",
    display: "flex",
    backgroundColor: background,
    padding: 10,
  },
  buttonGroup: {
    backgroundColor: background,
    width: "45%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    color: textColor,
  },
  title: {
    fontWeight: "700",
    color: textColor,
  },
  quantityView: {
    borderRadius: 15,
    width: 40,
    height: 40,
    padding: 10,
    margin: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(34, 40, 49)",
  },
  quantity: {
    color: textColor,
    fontWeight: "700",
  },
  button: {
    maxWidth: 50,
    height: 50,
    maxHeight: 50,
    padding: 5,
    backgroundColor: "rgb(118, 171, 174)",
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "700",
  },
});

export default EditQuantity;
