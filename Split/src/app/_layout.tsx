import { Slot } from "expo-router";
import { ThemeProvider, DefaultTheme, Theme } from '@react-navigation/native';

const LightTheme = {
    ...DefaultTheme,
    dark: false, // must be here
    colors: {
      ...DefaultTheme.colors,
      primary: '#007bff',
      background: '#f2f2f7',
      card: '#ffffff',
      text: '#000000',
      border: '#dcdcdc',
      notification: '#ff3b30',
    },
  };
export default function RootLayout(){
    return (
    <ThemeProvider value={LightTheme}>
      <Slot />
    </ThemeProvider>
    )
}