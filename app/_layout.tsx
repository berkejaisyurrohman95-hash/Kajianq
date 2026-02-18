import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

// IMPORT AUTHPROVIDER DISINI
import { AuthProvider } from '@/contexts/AuthContext'; 

import { registerForPushNotifications } from "@/utils/registerForPushNotifications";
import { savePushToken } from "@/services/notificationService";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    // Logic Notifikasi kamu sudah benar, tetap pertahankan
    const isExpoGo = Constants.appOwnership === "expo";

    if (!isExpoGo) {
      registerForPushNotifications().then(token => {
        if (token) {
          console.log("Push token:", token);
          savePushToken(token);
        }
      });
    }

    const receivedListener = Notifications.addNotificationReceivedListener(
      notification => { console.log("Notification received:", notification); }
    );

    const responseListener = Notifications.addNotificationResponseReceivedListener(
      response => { console.log("User clicked notification:", response); }
    );

    return () => {
      receivedListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    // BUNGKUS DENGAN AUTHPROVIDER
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" /> 
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}