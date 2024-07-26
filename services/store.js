import { create } from "zustand";

const useStore = create((set) => ({
  reload: true,
  products: [],
  setReload: (value) => set({ reload: value }),
  setProducts: (products) => set({ products }),
}));

export default useStore;
