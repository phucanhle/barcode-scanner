import create from "zustand";

interface Product {
  productid: string;
  name: string;
  quantity: number;
  image: string;
}

interface ProductState {
  products: Product[];
  reload: boolean;
  fetchProducts: () => Promise<void>;
  increaseProductQuantity: (productId: string, quantity: number) => void;
}

const useProductStore =
  create <
  ProductState >
  ((set) => ({
    products: [],
    reload: false,

    fetchProducts: async () => {
      try {
        const data = await fetchProducts(); // Fetch from your API
        set({ products: data });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    increaseProductQuantity: (productId: string, quantity: number) => {
      set((state) => ({
        products: state.products.map((product) =>
          product.productid === productId ? { ...product, quantity } : product
        ),
      }));
    },
  }));

export default useProductStore;
