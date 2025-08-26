import { create } from 'zustand';

type Item = {
  name: string;
  price: number;
};

type ReceiptStore = {
  id: string | null;
  storeName: string | null;
  date: string | null;
  items: Item[];
  total: number | null;
  tip: number | null;
  setId: (id: string) => void;
  setStoreName: (name: string | "") => void;
  setDate: (date: string) => void;
  setItems: (items: Item[]) => void;
  setTotal: (total: number) => void;
  setTip: (tip: number) => void;
  clear: () => void;
};

export const useReceiptStore = create<ReceiptStore>((set) => ({
  id: null,
  storeName: null,
  date: null,
  items: [],
  total: null,
  tip: null,
  setId: (id) => set({id: id}),
  setStoreName: (name) => set({ storeName: name }),
  setDate: (date) => set({ date }),
  setItems: (items) => set({ items }),
  setTotal: (total) => set({ total }),
  setTip: (tip) => set({tip}),
  clear: () => set({ storeName: null, date: null, items: [] }),
}));