import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import BarcodeScannerComponent from "@/components/BarcodeScanner";
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
                setProducts(data); // Cập nhật state products trong store
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        if (reload) {
            loadProducts();
            setReload(false); // Cập nhật state reload trong store
        }
    }, [reload, setReload, setProducts]); // Dependencies cho useEffect

    const renderItem = ({ item }: any) => (
        <EditQuantity
            productId={item.productid}
            productName={item.name}
            productQuantity={item.quantity}
            uri={item.image}
        />
    );

    const handleIncreaseQuantity = async (productId: string, curQuantity: number) => {
        try {
            const response = await increaseProductQuantity(productId, curQuantity + 1);
            if (response) {
                setReload(!reload);
                console.log("Update successful.");
            }
        } catch (error) {
            console.error("Update failed.");
        }
    };

    return (
        <View style={styles.container}>
            <BarcodeScannerComponent
                products={products}
                reload={reload}
                setReload={setReload}
                handleIncreaseQuantity={handleIncreaseQuantity}
            />
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Danh sách sản phẩm</Text>
            <FlatList
                style={styles.list}
                data={products}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.productid}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    list: {
        height: 100,
        width: "100%",
        padding: 15,
    },
});
