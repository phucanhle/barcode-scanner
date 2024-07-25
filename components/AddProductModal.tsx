import React, { useState } from "react";
import { Modal, StyleSheet, TextInput, TouchableOpacity, View, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAccessoryNavigation } from "react-native-keyboard-accessory";

interface AddProductModalProps {
    productId: string;
    visible: boolean;
    onClose: () => void;
    onAddProduct: (productId: string, productName: string, productQuantity: number, productImage: string) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ productId, visible, onClose, onAddProduct }) => {
    const [productName, setProductName] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productImage, setProductImage] = useState("");

    const pickImage = async () => {
        // Kiểm tra quyền truy cập ảnh
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Chúng tôi cần quyền truy cập ảnh để thực hiện chức năng này.");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets[0].uri) {
            setProductImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        // Kiểm tra quyền truy cập camera
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            alert("Chúng tôi cần quyền truy cập camera để thực hiện chức năng này.");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets[0].uri) {
            setProductImage(result.assets[0].uri);
        }
    };

    const handleAddProduct = () => {
        if (!productName || !productQuantity) {
            alert("Vui lòng nhập tất cả các thông tin yêu cầu.");
            return;
        }

        onAddProduct(productId, productName, parseInt(productQuantity, 10), productImage);
        setProductName("");
        setProductQuantity("");
        setProductImage("");
        onClose();
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Thêm sản phẩm mới</Text>
                    <Text style={styles.label}>ID sản phẩm: {productId}</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Tên sản phẩm</Text>
                        <TextInput
                            returnKeyType="done"
                            style={styles.input}
                            value={productName}
                            onChangeText={setProductName}
                            enterKeyHint="done"
                            placeholder="Nhập tên sản phẩm"
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Số lượng</Text>
                        <TextInput
                            style={styles.input}
                            value={productQuantity}
                            onChangeText={setProductQuantity}
                            keyboardType="numeric"
                            placeholder="Nhập số lượng"
                        />
                    </View>

                    <View style={[styles.buttonContainer, { marginVertical: 20 }]}>
                        <TouchableOpacity style={styles.button} onPress={pickImage}>
                            <Text style={styles.buttonText}>Chọn ảnh từ thư viện</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={takePhoto}>
                            <Text style={styles.buttonText}>Chụp ảnh</Text>
                        </TouchableOpacity>
                    </View>
                    {productImage ? (
                        <Image source={{ uri: productImage }} style={styles.imagePreview} />
                    ) : (
                        <Text style={styles.imagePreviewText}>Không có ảnh</Text>
                    )}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: "gray" }]} onPress={onClose}>
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
                            <Text style={styles.buttonText}>Thêm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <KeyboardAccessoryNavigation
                style={styles.accessory} // Áp dụng kiểu cho KeyboardAccessoryNavigation
            />
        </Modal>
    );
};
const background = "rgb(49, 54, 63)";
const textColor = "rgb(238, 238, 238)";
const buttonBG = "rgb(118, 171, 174)";

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        padding: 20,
        backgroundColor: background,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        color: textColor,
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    inputGroup: {
        padding: 10,
    },
    label: {
        color: textColor,
        marginVertical: 10,
    },
    input: {
        minWidth: 350,
        marginBottom: 15,
        fontSize: 16,
        padding: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        color: textColor,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        backgroundColor: buttonBG,
        borderRadius: 5,
        alignItems: "center",
        maxHeight: 50,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginVertical: 10,
        borderRadius: 5,
    },
    imagePreviewText: {
        fontSize: 16,
        color: "#999",
    },
    accessory: {
        backgroundColor: background,
    },
});

export default AddProductModal;
