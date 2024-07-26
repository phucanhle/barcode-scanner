import React, { useState, useRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

import { CameraView, useCameraPermissions } from "expo-camera";

import { addProduct, increaseProductQuantity } from "@/services/index";
import useStore from "@/services/store";

import AddProductModal from "./AddProductModal";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function BarcodeScanner() {
  /**  Global state */
  const { products, reload, setReload, setProducts } = useStore();

  /** Local state */
  const cameraRef = useRef<CameraView | null>(null);
  const [cameraOn, setCameraOn] = useState<boolean>(true);
  const [permission, requestPermission] = useCameraPermissions();
  const [zoom, setZoom] = useState<number>(0);
  const [scanned, setScanned] = useState<boolean>(false);
  const [scannedProductId, setScannedProductId] = useState<string>("");
  const [showModalAddProduct, setShowModalAddProduct] =
    useState<boolean>(false);

  /** Logic kiểm tra quyền truy cập camera */
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

  /** Logic thêm một sản phẩm chưa có trong CSDL */
  // Kiểm tra sản phẩm trong CSDL
  const checkProductInDatabase = (data: string) => {
    const product = products.find((p: any) => p.productid === data);
    return !!product;
  };

  // Thêm sản phẩm vào CSDL
  const handleAddProduct = async (
    productId: string,
    productName: string,
    productQuantity: number,
    productImage: string
  ) => {
    if (!productId || !productName || !productQuantity) {
      console.error("Missing required product information.");
      return false;
    }
    try {
      await addProduct(productId, productName, productImage, productQuantity);
      Toast.show({
        type: "success",
        text1: "Tạo thành công",
        text2: `Sản phẩm ${productName}, số lượng ban đầu: ${productQuantity}`,
      });
      setShowModalAddProduct(false);
      setCameraOn(true);
      setReload(!reload);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  /** Logic tăng số lượng của sản phẩm đã có trong CSDL */
  // Tìm số lượng hiện tại
  const findQuantity = (productId: string) => {
    const product = products.find((p: any) => p.productid === productId);
    return product.quantity;
  };

  // Tăng số lượng + 1 và reload page.
  const handleIncreaseQuantity = async (
    productId: string,
    curQuantity: number
  ) => {
    const res = await increaseProductQuantity(productId, curQuantity + 1);
    if (res) {
      setReload(!reload);
    }
  };

  // Khi quét được barcode
  // Kiểm tra xem đã có chưa.
  // ĐÃ CÓ : tăng số lượng +1
  // CHƯA CÓ: mở Modal thêm thông tin
  const handleBarCodeScanned = async (e: any) => {
    const { data } = e;

    if (scanned) return;
    setScanned(true);

    try {
      const exists = checkProductInDatabase(data);
      if (!exists) {
        setShowModalAddProduct(true);
        setCameraOn(false);
      } else {
        handleIncreaseQuantity(data, findQuantity(data));
        Toast.show({
          type: "success",
          text1: "Thêm thành công",
          text2: `ID sản phẩm: ${data}, số lượng hiện tại: ${
            findQuantity(data) + 1
          }`,
        });
      }
      setScannedProductId(data);
    } catch (error) {
      console.error("Error checking product:", error);
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCameraOn(!cameraOn)}
        >
          <Text style={styles.buttonText}>
            {cameraOn ? "Tắt" : "Mở"} Camera
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setZoom((prevZoom) => (prevZoom === 0 ? 0.01 : 0))}
        >
          <Text style={styles.buttonText}>Zoom x2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => setScanned(false)}
        >
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
    display: "flex",
    alignItems: "center",
  },
  containerPermission: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    marginVertical: 10,
    width: 400,
    height: 150,
  },
  cameraClose: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 150,
    backgroundColor: "rgb(49, 54, 63)",
    marginVertical: 10,
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
    backgroundColor: "rgb(118, 171, 174)",
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
    backgroundColor: "rgb(49, 54, 63)",
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
