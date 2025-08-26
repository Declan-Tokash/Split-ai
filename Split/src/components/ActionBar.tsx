import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from './CustomButton'; // adjust path


type ButtonConfig = {
    text: string;
    icon?: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
    action: () => void;
    variant: 'dark' | 'light';
  };
  
  type Props = {
    buttons: ButtonConfig[];
  };
  
  export default function ActionBar({ buttons }: Props) {
    const router = useRouter();
  
    return (
      <View style={styles.floatingBox}>
        {buttons.map((btn, index) => (
          <CustomButton
            key={index}
            text={btn.text}
            icon={btn.icon}
            onPress={btn.action}
            variant={btn.variant}
          />
        ))}
      </View>
    );
  }

const styles = StyleSheet.create({
    floatingBox: {
      position: 'absolute',
      bottom: 40,
      left: 20,
      right: 20,
      backgroundColor: 'white',
      padding: 18,
      borderRadius: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 14,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 4,
    },
  });
