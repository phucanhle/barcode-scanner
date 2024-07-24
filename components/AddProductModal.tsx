import React, { useState } from "react";
import { Modal, StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native";

interface AddProductModalProps {
    productId: string;
    visible: boolean;
    onClose: () => void;
    onAddProduct: (productId: string, productName: string, productPrice: string) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ productId, visible, onClose, onAddProduct }) => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");

    const handleAddProduct = () => {
        onAddProduct(productId, productName, productPrice);
        setProductName("");
        setProductPrice("");
        onClose();
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Add New Product</Text>
                    <Text style={styles.modalTitle}>{productId}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Product Name"
                        value={productName}
                        onChangeText={setProductName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Product Price"
                        value={productPrice}
                        onChangeText={setProductPrice}
                        keyboardType="numeric"
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
                            <Text style={styles.buttonText}>Thêm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    input: {
        width: "100%",
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
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
        backgroundColor: "#007bff",
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
});

export default AddProductModal;
