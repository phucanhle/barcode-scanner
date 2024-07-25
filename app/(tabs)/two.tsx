import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import BarcodeScannerComponent from "@/components/BarcodeScanner";
import { Text, View } from "@/components/Themed";
import EditQuantity from "@/components/EditQuantity";
import { fetchProducts } from "@/database/database";
export default function BarcodeScanner() {
    const initialProducts = [
        {
            productId: "123",
            productName: "Canon EOS R100 + Lens 18-45mm",
            productQuantity: 1,
            uri: "https://cdn.vjshop.vn/may-anh/mirrorless/canon/canon-eos-r100/lens-18-45mm/canon-eos-r100-lens-18-45mm-500x500.jpg",
        },
        {
            productId: "12354",
            productName: "Sony ZV-E10 II (Black, Body Only)",
            productQuantity: 1,
            uri: "https://cdn.vjshop.vn/may-anh/mirrorless/sony/sony-zv-e10-ii/body-black/sony-zv-e10-ii-body-black-1-500x500.jpg",
        },
        {
            productId: "2135",
            productName: "Sony Alpha A6400 (Black)",
            productQuantity: 1,
            uri: "https://cdn.vjshop.vn/may-anh/mirrorless/sony/sony-alpha-a6400/sony-alpha-a6400-kit-16-50mm-black-chinh-hang3-500x500.jpg",
        },
        {
            productId: "8332",
            productName: "Sony Alpha A7S III",
            productQuantity: 1,
            uri: "https://cdn.vjshop.vn/may-anh/mirrorless/sony/sony-a7siii/sony-a7s-mark-iii-1-500x500.jpg",
        },
        {
            productId: "83232",
            productName: "Nikon Z6 III + Lens 24-70mm F/4S",
            productQuantity: 1,
            uri: "https://cdn.vjshop.vn/may-anh/mirrorless/nikon/nikon-z6-iii/nikon-z6-iii-37-500x500.jpg",
        },
    ];
    const [products, setProducts] = useState(initialProducts);

    useEffect(() => {
        fetchProducts();
    }, []);

    const renderItem = ({ item }: any) => (
        <EditQuantity
            key={item.productId}
            productId={item.productId}
            productName={item.productName}
            productQuantity={item.productQuantity}
            uri={item.uri}
        />
    );

    return (
        <View style={styles.container}>
            <BarcodeScannerComponent />
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Danh sách sản phẩm</Text>
            <FlatList
                style={styles.list}
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.productId}
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
