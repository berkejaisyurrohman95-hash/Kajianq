import { Tabs } from 'expo-router';
import { Book, Mic, Video, Hop as Home, User, Shield, GraduationCap } from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';

export default function TabLayout() {
  const { user } = useAuthStore();

  // Admin tabs
  if (user?.role === 'admin') {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#ef4444',
          tabBarInactiveTintColor: '#64748b',
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#e2e8f0',
            paddingBottom: 8,
            paddingTop: 8,
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}>
        
        <Tabs.Screen
          name="admin-dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ size, color }) => (
              <Shield size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        
        <Tabs.Screen
          name="admin-users"
          options={{
            title: 'Users',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        
        <Tabs.Screen
          name="admin-content"
          options={{
            title: 'Content',
            tabBarIcon: ({ size, color }) => (
              <Book size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
      </Tabs>
    );
  }

  // Asatidz tabs
  if (user?.role === 'asatidz') {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#f59e0b',
          tabBarInactiveTintColor: '#64748b',
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#e2e8f0',
            paddingBottom: 8,
            paddingTop: 8,
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}>
        
        <Tabs.Screen
          name="asatidz-dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ size, color }) => (
              <GraduationCap size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        
        <Tabs.Screen
          name="live"
          options={{
            title: 'Live',
            tabBarIcon: ({ size, color }) => (
              <Video size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        
        <Tabs.Screen
          name="bahtsul-masail"
          options={{
            title: 'Q&A',
            tabBarIcon: ({ size, color }) => (
              <Book size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
      </Tabs>
    );
  }
  // User tabs (default)
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="quran-ai"
        options={{
          title: 'AI Quran',
          tabBarIcon: ({ size, color }) => (
            <Mic size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="quran-reader"
        options={{
          title: 'Al-Quran',
          tabBarIcon: ({ size, color }) => (
            <Book size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="doa-harian"
        options={{
          title: 'Doa',
          tabBarIcon: ({ size, color }) => (
            <Book size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="live"
        options={{
          title: 'Live',
          tabBarIcon: ({ size, color }) => (
            <Video size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}