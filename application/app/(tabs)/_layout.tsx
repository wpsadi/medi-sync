import { Tabs } from 'expo-router';
import { MessageCircle } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#007AFF',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'MediSync',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}