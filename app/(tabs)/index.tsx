import { StyleSheet } from "react-native";
import ProductsList from "@/components/ProductsList";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import productsData from "@/data/data.json";

export default function List() {
  return (
    <View style={styles.container}>
      <ProductsList products={productsData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
