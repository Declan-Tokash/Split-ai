import { create } from "zustand";

type Item = {
  name: string;
  price: number;
};

type Order = {
  _id: string;
  name: string;
  date: string;
  items: Item[];
  total: number;
  tip: number;
};

type OrderListStore = {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  clearOrders: () => void;
};

export const useOrderListStore = create<OrderListStore>((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
  clearOrders: () => set({ orders: [] }),
}));
