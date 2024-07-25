// apiService.js
import axios from "axios";

const API_URL = "http://192.168.1.12:3000"; // Thay đổi URL thành địa chỉ server của bạn

export const createProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}/products`, product, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const checkProductInDatabase = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        return response.data; // Sản phẩm tìm thấy
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // Nếu sản phẩm không tồn tại, trả về null hoặc false
            return null;
        }
        console.error("Error checking product:", error);
        throw error;
    }
};

export const addProduct = async (productId, productName, productImage, productQuantity) => {
    if (!productId || !productName || !productImage || !productQuantity) {
        throw new Error("Missing required product information.");
    }

    if (isNaN(productQuantity) || parseInt(productQuantity, 10) <= 0) {
        throw new Error("Invalid product quantity.");
    }

    try {
        const formData = new FormData();

        formData.append("productId", productId);
        formData.append("productName", productName);
        formData.append("productQuantity", parseInt(productQuantity, 10));

        formData.append("productImage", productImage);

        const response = await fetch(productImage);
        if (!response.ok) {
            throw new Error("Failed to fetch image.");
        }

        const blob = await response.blob();

        // Construct the filename from URI
        const filename = productImage.split("/").pop() || "image.jpg";

        formData.append("productImage", blob, filename);

        console.log("Filename " + filename);
        console.log("Form " + JSON.stringify(formData));

        const apiResponse = await axios.post(`${API_URL}/products`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return apiResponse.data;
    } catch (error) {
        console.error("Error adding product:", error.message || error);
        throw error;
    }
};
