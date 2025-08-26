import { StyleSheet, View } from "react-native";
import OrderHistory from "../components/OrderHistory";
import ActionBar from "../components/ActionBar";
import { useRouter } from 'expo-router';
import Header from "../components/Header";
import BalanceOverview from "../components/BalanceOverview";
import { useEffect, useState } from "react";
import { getUserOrders } from "../services/GetUserOrders";
import { useOrderListStore } from "../stores/useOrderListStore";


export interface Item {
  name: string;
  price: number;
}

export interface Order {
  _id: string;
  name: string;
  date: string;
  items: Item[];
  total: number;
  tip: number;
}

export default function Home(){
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const userId = "68ab5705e972a85b3dfc6881"
    const [total, setTotal] = useState<number>(0);
    
      useEffect(() => {
        const fetchOrders = async () => {
          try {
            const data = await getUserOrders(userId);
            if (data?.length > 0) {
              // Transform into correct shape once
              const formattedOrders: Order[] = data.map((order: any) => ({
                _id: order._id,
                name: order.name,
                date: order.date,
                items: order.items.map((item: any) => ({
                  name: item.name,
                  price: item.price,
                })),
                total: order.total,
                tip: order.tip ?? 0,
              }));
              useOrderListStore.getState().setOrders(formattedOrders);
              setOrders(formattedOrders); // if you also need local state
            }
          } catch (err: any) {
            console.error("Failed to fetch orders:", err);
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchOrders();
      }, []);



      useEffect(() => {
        let total = 0
        orders.forEach(order => {
          total = total + order.total
        });
        setTotal(total)
      }, [orders])

    return (
    <View style={styles.container}>
      <Header/>
      <BalanceOverview
        totalSplit={total}
        tip="Pro tip: Next time, scan your receipt to save time splitting!"
      />
      <OrderHistory/>
      <ActionBar
        buttons={[
            {
            text: 'Scan',
            icon: 'scan',
            action: () => router.push('/(scan)/camera'),
            variant: 'dark',
            },
            {
            text: 'Manually',
            action: () => router.push('/(scan)/review'),
            variant: 'light',
            },
        ]}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 65,
      paddingHorizontal: 20,
      backgroundColor: '#f2f2f7',
    },
    title: {
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
    },
  });