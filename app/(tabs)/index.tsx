import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { fetchProducts } from "@/database/database";
import { useState, useEffect } from "react";
// import EditQuantity from "@/components/EditQuantity";
export default function List() {
    const [productsData, setProductsData] = useState([]);
    useEffect(() => {
        // Định nghĩa một hàm async để gọi API
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProductsData(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        loadProducts();
    }, []);

    return <View style={styles.container}>{/* <EditQuantity></EditQuantity> */}</View>;
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
