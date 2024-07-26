// apiService.js
import axios from "axios";
import FormData from "form-data";

const API_URL = process.env.EXPO_PUBLIC_API_URL; // Thay đổi URL thành địa chỉ server của bạn

export const createProduct = async (product) => {
  try {
    // Kiểm tra dữ liệu đầu vào
    if (!product || !product.name || !product.price || !product.quantity) {
      throw new Error("Missing required product information.");
    }

    const response = await axios.post(`${API_URL}/products`, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error.message);
    throw new Error("Failed to create product.");
  }
};

export const fetchProducts = async () => {
  try {
    // console.log("Starting fetch...");
    // console.log(`Connecting to API: ${API_URL}/products`);
    const response = await axios.get(`${API_URL}/products`);
    // console.log("DONE.");
    return response.data;
  } catch (error) {
    // console.log("FAILED.");

    console.error("Error fetching products:", error.message);
    throw new Error("Failed to fetch products.");
  }
};

export const checkProductInDatabase = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Sản phẩm không tồn tại
      return false;
    }
    console.error("Error checking product:", error.message);
    throw new Error("Failed to check product.");
  }
};

export const addProduct = async (
  productId,
  productName,
  productImage,
  productQuantity
) => {
  try {
    const formData = new FormData();

    formData.append("productId", productId);
    formData.append("productName", productName);
    formData.append("productQuantity", parseInt(productQuantity, 10));

    // Construct the filename from URI
    const filename = productImage.split("/").pop() || "image.jpg";
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append("productImage", {
      uri: productImage,
      name: filename,
      type,
    });

    const apiResponse = await axios.post(`${API_URL}/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return apiResponse.data;
  } catch (error) {
    console.error("Error adding product:", error.message);
    throw new Error("Failed to add product.");
  }
};

export const increaseProductQuantity = async (productId, quantity) => {
  try {
    const response = await axios.put(
      `${API_URL}/products/${productId}/quantity`,
      {
        quantity: quantity,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error increasing product quantity:", error.message);
    throw new Error("Failed to increase product quantity.");
  }
};
