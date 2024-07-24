import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

interface AddProductModalProps {
  productId: string;
  visible: boolean;
  onClose: () => void;
  onAddProduct: (
    productId: string,
    productName: string,
    productPrice: string
  ) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  productId,
  visible,
  onClose,
  onAddProduct,
}) => {
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const handleAddProduct = () => {
    onAddProduct(productId, productName, productQuantity);
    setProductName("");
    setProductQuantity("");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Thêm sản phẩm mới</Text>
          <Text style={styles.label}>ID sản phẩm: {productId}</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên sản phẩm</Text>
            <TextInput
              style={styles.input}
              value={productName}
              onChangeText={setProductName}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Số lượng</Text>
            <TextInput
              style={styles.input}
              value={productQuantity}
              onChangeText={setProductQuantity}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "gray" }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
              <Text style={styles.buttonText}>Thêm</Text>
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
  inputGroup: {
    padding: 10,
  },
  label: {
    color: "#000",
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
