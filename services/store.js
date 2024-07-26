import { create } from "zustand";

const useStore = create((set) => ({
    reload: true, // State ban đầu
    products: [], // Mảng sản phẩm ban đầu
    setReload: (value) => set({ reload: value }),
    setProducts: (products) => set({ products }),
}));

export default useStore;
