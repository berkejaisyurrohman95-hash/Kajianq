import { 
  BookOpen, Home, Trophy, User, Plus, ListChecks, HousePlus, Monitor, CloudUpload, Building2, Shield 
} from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';


import IndexScreen from './index';
import quran_ai from './quran-ai';
import quran_reader from './quran-reader';
import bahtsul_massail from './bahtsul-masail';
import ProfileScreen from './profile';
import donasi  from './donasi';
import admin from './admin-dashboard';
import asatidz from './asatidz-dashboard';
import doa_harian from './doa-harian';
import keilmuan from './keilmuan';
import kilas_balik from './kilas-balik';
import live from './live';
import kelas from './kelas-private';
import AdminDashboardScreen from './admin-dashboard';

const { width } = Dimensions.get('window'); 
const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  const { user, profile, loading } = useAuth();
  const insets = useSafeAreaInsets();
  const role = profile?.role;

  useEffect(() => {
    if (!loading && !user) {
      router.replace('./(auth)/welcome');
    }
  }, [loading, user]);

  if (loading || !user || !profile) return null;


  const getTabsForRole = () => {
    const commonTabs = [
      { name: 'Home', component: IndexScreen, icon: Home, isCenter: false },
      { name: 'quran_ai', component: quran_ai, icon: Trophy, isCenter: false },
      { name: 'quran_reader', component: quran_reader, icon: User, isCenter: false },
      { name: 'live', component: bahtsul_massail, icon: User, isCenter: false },
      { name: 'kelas', component: donasi, icon: User, isCenter: false },
      { name: 'kelas', component: admin, icon: User, isCenter: false },
      { name: 'kelas', component: ProfileScreen, icon: User, isCenter: false },
      { name: 'kelas', component: asatidz, icon: User, isCenter: false },
      { name: 'kelas', component: doa_harian, icon: User, isCenter: false },
      { name: 'kelas', component: keilmuan, icon: User, isCenter: false },
      { name: 'kelas', component: kilas_balik, icon: User, isCenter: false },
      { name: 'kelas', component: live, icon: User, isCenter: false },
      { name: 'kelas', component: kelas, icon: User, isCenter: false },
    ];
    switch (role) {
      case 'user':
        return [
          
          ...commonTabs,
          
        ];
      case 'asatidz':
        return [
          ...commonTabs,
         
        ];
      case 'admin':
        return [
          ...commonTabs,
    
        ];
      default:
        return commonTabs;
    }
  };

  const tabs = getTabsForRole();

  const renderTabIcon = (
    IconComponent: any,
    focused: boolean,
    color: string,
    size: number,
    isCenter = false
  ) => {
    if (isCenter) {
      return (
        <View style={{
          width: 64, height: 64, borderRadius: 32, marginTop: -20,
          shadowColor: '#10B981', shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3, shadowRadius: 16, elevation: 12,
        }}>
          <LinearGradient
            colors={focused ? ['#10B981', '#059669'] : ['#E5E7EB', '#D1D5DB']}
            style={{
              flex: 1, borderRadius: 32, alignItems: 'center', justifyContent: 'center',
              borderWidth: 4, borderColor: 'white',
            }}
          >
            <IconComponent size={28} color="white" />
          </LinearGradient>
        </View>
      );
    }

    return <IconComponent size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom + 8 : 12,
          paddingTop: 12,
          height: Platform.OS === 'ios' ? 85 + insets.bottom : 85,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          elevation: 20,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 11,
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ size, color, focused }) =>
              renderTabIcon(tab.icon, focused, color, size, tab.isCenter),
            tabBarLabel: tab.isCenter ? '' : tab.name,
            title: tab.name,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
