import { StyleSheet, View, FlatList, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from 'expo-router';
import Item from "../../components/Item";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import TipSelector from "../../components/TipBar";
import { useState } from "react";
import { useReceiptStore } from "../../stores/useOrderStore";
import { postOrder } from "../../services/PostOrder";

export interface Item {
  name: string;
  price: number;
}

export interface OrderPayload {
  userId: string;
  name: string;
  date: string;
  items: Item[];
  total: number;
  tip: number;
}

export default function Home() {
  const handleEdit = (item: any) => {
    console.log(`Edit pressed for ${item.name}`);
  };

  const [tip, setTip] = useState<number | null>(null);
  const router = useRouter();
  const total = (useReceiptStore(state => state.total) ?? 0) + (tip ?? 0);
  const name = useReceiptStore((state) => state.storeName)
  const date = useReceiptStore((state) => state.date)
  const items = useReceiptStore((state) => state.items)
  const userID = "68ab5705e972a85b3dfc6881"
  const [loading, setLoading] = useState(false);


  const handleCompleteOrder = async () => {
    const orderPayload: OrderPayload = {
      userId: userID,
      name: name ?? "",
      date: date ?? "",
      items,
      total,
      tip: tip ?? 0,
    };
    console.log(orderPayload)
    try {
        setLoading(true);
        if (!orderPayload) {
            return "order not avilable";
          }else {
                const data = await postOrder(orderPayload);
                router.push('home');
          }
          } catch (err) {
            console.error('Failed to post order:', err);
          } finally {
            setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Scan Completed</Text>

      <View style={styles.card}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderImage}>
              <Ionicons name="fast-food-outline" size={42} color="black" />
            </View>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardDate}>{date}</Text>
            {/* <Text style={styles.cardTitle}>{items.store}</Text>
            <Text style={styles.cardDate}>{items.date}</Text> */}
          </View>

          <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
          {/* <Text style={styles.totalText}>Total: $27.56</Text> */}

          <FlatList
            data={items}
            // data={items.items}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Item
                name={item.name}
                price={item.price}
              />
            )}
            scrollEnabled={false}
            contentContainerStyle={{ paddingTop: 10 }}
          />
            <View style={styles.tipCard}>
                <Text>Select a Tip</Text>
                <TipSelector selectedTip={tip} onTipChange={setTip} />
            </View>
            <View style={styles.tipAmount}>
                <Text>Tip: +${tip?.toFixed(2)}</Text>
            </View>
        </ScrollView>
      </View>

      <TouchableOpacity onPress={handleCompleteOrder} style={styles.button}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 24,
    backgroundColor: '#f2f2f7',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  card: {
    flex: 1,
    marginTop: 24,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 24,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  cardHeader: {
    alignItems: 'center',
  },
  cardHeaderImage: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 50,
    padding: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  cardDate: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 10,
  },
  tipCard: {
    alignItems: 'center',
    marginTop: 24,
  },
  tipAmount: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    alignItems: 'flex-end'
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});
