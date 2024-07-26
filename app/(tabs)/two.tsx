import React, { useEffect, useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import BarcodeScanner from "@/components/BarcodeScanner";
import { Text, View } from "@/components/Themed";
import EditQuantity from "@/components/EditQuantity";

import { fetchProducts, increaseProductQuantity } from "@/services/index";
import useStore from "@/services/store"; // Import store

export default function ScannerScreen() {
  const { reload, products, setReload, setProducts } = useStore();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (reload) {
      loadProducts();
      setReload(false);
    }
  }, [reload, setReload, setProducts]);

  //   const handleIncreaseQuantity = useCallback(
  //     async (productId: string, curQuantity: number) => {
  //       try {
  //         const response = await increaseProductQuantity(productId, curQuantity);
  //         if (response) {
  //           console.log(
  //             `Updated: state:${curQuantity} / res:${response.quantity}`
  //           );
  //         }
  //       } catch (error) {
  //         console.error("Update failed.");
  //       }
  //     },
  //     []
  //   );

  const renderItem = useCallback(
    ({ item }: any) => (
      <EditQuantity
        product={item}
        // onIncreaseQuantity={handleIncreaseQuantity}
      />
    ),
    []
    // [handleIncreaseQuantity]
  );

  return (
    <View style={styles.container}>
      <BarcodeScanner />
      <Text style={styles.title}>Danh sách sản phẩm</Text>
      <FlatList
        style={styles.list}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.productid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  list: {
    height: "50%",
    width: "100%",
    padding: 15,
  },
});
