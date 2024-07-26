import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { View, Text } from "./Themed";
import Toast from "react-native-toast-message";

import useStore from "@/services/store";
import { increaseProductQuantity } from "@/services/index";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const EditQuantity = ({ product }: any) => {
  const { reload, setReload } = useStore();

  const { productid, name, image, quantity } = product;
  // Lấy href của hình ảnh
  const href = API_URL?.concat(image);

  const [curQuantity, setQuantity] = useState(quantity);

  // Tăng số lượng
  const handleIncreaseQuantity = async (
    productId: string,
    curQuantity: number
  ) => {
    const res = await increaseProductQuantity(productId, curQuantity);
    if (res) {
      Toast.show({
        type: "success",
        text1: "Cập nhật thành công",
        text2: `Sản phẩm ${productId}, số lượng: ${curQuantity}`,
      });
      setReload(!reload);
    }
  };

  const handleReduce = () => {
    if (curQuantity > 0) {
      const newQuantity = curQuantity - 1;
      setQuantity(newQuantity);
      handleIncreaseQuantity(productid, newQuantity);
    }
  };

  const handleIncrease = () => {
    const newQuantity = curQuantity + 1;
    setQuantity(newQuantity);
    handleIncreaseQuantity(productid, newQuantity);
  };

  const handleChange = (value: string) => {
    const newQuantity = parseInt(value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
      handleIncreaseQuantity(productid, newQuantity);
    } else {
      setQuantity(0);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: href }} style={styles.image} />
      <View style={styles.textGroup}>
        <Text style={styles.text}>{productid}</Text>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={handleReduce}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.quantityView}>
          <TextInput
            returnKeyType="done"
            enterKeyHint="done"
            style={styles.quantity}
            value={String(quantity)}
            keyboardType="numeric"
            onChangeText={handleChange}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleIncrease}>
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
    display: "flex",
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
    width: 50,
    height: 40,
    paddingVertical: 5,
    margin: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(34, 40, 49)",
  },
  quantity: {
    color: textColor,
    fontWeight: "700",
    width: 50,
    textAlign: "center",
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
