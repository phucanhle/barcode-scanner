import { StyleSheet } from "react-native";

import BarcodeScannerComponent from "@/components/BarcodeScanner";
// import ProductsList from "@/components/ProductsList";

import { Text, View } from "@/components/Themed";
// import productsData from "@/data/data.json";

export default function BarcodeScanner() {
    return (
        <View style={styles.container}>
            <BarcodeScannerComponent />
            
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
