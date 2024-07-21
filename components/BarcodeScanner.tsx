import React, { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function BarcodeScanner() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [zoom, setZoom] = useState<number>(0); // Zoom state
  const cameraRef = useRef<CameraView | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleBarCodeScanned = (e: any) => {
    const { type, data } = e;
    setScanned(true);
    console.log(e);
    alert(`Barcode Scanned \nType: ${type}\nData: ${data}`);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        zoom={zoom}
        ref={cameraRef}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        {/* Optional: Overlay or other components can go here */}
      </CameraView>
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => setScanned(false)}
      >
        <Text style={styles.scanButtonText}>Quét</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setZoom((prevZoom) => (prevZoom === 0 ? 0.01 : 0))}
        >
          <Text style={styles.buttonText}>Zoom x2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  camera: {
    marginVertical: 30,
    width: 350,
    height: 200,
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
  scanButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
    elevation: 3,
  },
  scanButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 5,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
