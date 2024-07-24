import React, { useState, useRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

import AddProductModal from "./AddProductModal";

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
export default function BarcodeScanner() {
    const [cameraOn, setCameraOn] = useState<boolean>(true);
    const [permission, requestPermission] = useCameraPermissions();
    const [zoom, setZoom] = useState<number>(0); // Zoom state
    const cameraRef = useRef<CameraView | null>(null);
    const [scanned, setScanned] = useState<boolean>(false);

    const [scannedProductId, setScannedProductId] = useState<string>("");
    const [showModalAddProduct, setShowModalAddProduct] = useState<boolean>(false);

    /*Logic kiểm tra quyền truy cập camera */

    if (!permission) {
        // Camera đang hoạt động
        return <View />;
    }

    if (!permission.granted) {
        // Camera chưa được cấp quyền
        return (
            <View style={styles.containerPermission}>
                <Text style={{ textAlign: "center", color: "#F00" }}>
                    Chúng tôi cần sử dụng Camera để thực hiện chức năng quét
                </Text>
                <Button onPress={requestPermission} title="Cấp quyền cho Camera" />
            </View>
        );
    }

    /* Logic sau khi quét sản phẩm*/
    const checkProductInDatabase = (productId: string) => {
        // Thực hiện kiểm tra logic với CSDL thật
        // Trả về true nếu sản phẩm đã tồn tại, false nếu chưa tồn tại
        return false; // Giả định sản phẩm chưa tồn tại
    };
    const handleAddProduct = (productId: string, productName: string, productPrice: string) => {
        // Thực hiện gửi thông tin sản phẩm mới lên backend và cập nhật CSDL
        console.log(`Adding product: ${productName}, price: ${productPrice}`);
        // Sau khi thành công, bạn có thể cập nhật giao diện hoặc thực hiện các thao tác khác
        setShowModalAddProduct(false);
    };
    const handleBarCodeScanned = (e: any) => {
        const { type, data } = e;
        setScanned(true);

        // Kiểm tra xem sản phẩm có tồn tại trong CSDL hay chưa
        const productExistsInDatabase = checkProductInDatabase(data);
        setScannedProductId(data);

        if (!productExistsInDatabase) {
            // Nếu sản phẩm chưa có trong CSDL, hiển thị Modal để thêm sản phẩm mới
            setShowModalAddProduct(true);
        } else {
            // Nếu sản phẩm đã có trong CSDL, có thể thực hiện điều chỉnh số lượng
            // Navigating to add product screen and adjust quantity if needed
            console.log("Product already exists in database.");
            // Chuyển đến trang thêm sản phẩm và có thể điều chỉnh số lượng ở đây
        }
    };

    return (
        <View style={styles.container}>
            {cameraOn ? (
                <CameraView
                    style={styles.camera}
                    zoom={zoom}
                    ref={cameraRef}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                ></CameraView>
            ) : (
                <View style={styles.cameraClose}>
                    <TabBarIcon name="camera" color={"gray"} />
                </View>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setCameraOn(!cameraOn)}>
                    <Text style={styles.buttonText}>{cameraOn ? "Tắt" : "Mở"} Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setZoom((prevZoom) => (prevZoom === 0 ? 0.01 : 0))}
                >
                    <Text style={styles.buttonText}>Zoom x2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(false)}>
                    <Text style={styles.scanButtonText}>Quét</Text>
                </TouchableOpacity>
            </View>

            {/* Add Product Modal */}
            <AddProductModal
                productId={scannedProductId}
                visible={showModalAddProduct}
                onClose={() => setShowModalAddProduct(false)}
                onAddProduct={handleAddProduct}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    containerPermission: { flex: 1, alignItems: "center", justifyContent: "center" },
    camera: {
        marginVertical: 30,
        width: 350,
        height: 200,
    },
    cameraClose: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 350,
        height: 200,
        backgroundColor: "#6EACDA",
        marginVertical: 30,
        borderRadius: 10,
    },
    permissionText: {
        textAlign: "center",
        fontSize: 18,
        color: "#333",
        marginBottom: 20,
    },
    permissionButton: {
        backgroundColor: "#007bff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        elevation: 3,
    },
    permissionButtonText: {
        color: "white",
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        backgroundColor: "transparent",
        marginVertical: 20,
    },
    scanButton: {
        backgroundColor: "#28a745",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        margin: 10,
        elevation: 3,
    },
    scanButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "gray",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        margin: 10,
        elevation: 3,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
});
