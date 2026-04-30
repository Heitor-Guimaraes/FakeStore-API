import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppRoutes from './src/routes/AppRoutes';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppRoutes />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
