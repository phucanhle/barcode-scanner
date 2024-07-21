import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, ListRenderItem } from "react-native";
import { MonoText } from "./StyledText";
import { View, Text } from "./Themed";

interface Product {
  id: number;
  name: string;
  price: string;
}

interface ProductsListProps {
  products: Product[];
}
export default function ProductsList({ products }: ProductsListProps) {
  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <View style={styles.item}>
      <MonoText>{item.name}</MonoText>
      <Text>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: "100%",
  },
  item: {
    paddingHorizontal: 25,
    fontSize: 18,
    height: 44,
    backgroundColor: "#111",
    marginVertical: 5,
  },
});
