import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '@/store/authStore';
import { Splash } from '@/pages/Splash';
import { Login } from '@/pages/Login';
import { SignUp } from '@/pages/SignUp';
import { Home } from '@/pages/Home';
import { Result } from '@/pages/Result';
import { Alert } from '@/pages/Alert';
import { History } from '@/pages/History';
import { Help } from '@/pages/Help';
import { Settings } from '@/pages/Settings';
import { About } from '@/pages/About';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { t } from '@/lib/i18n';
import { useSettingsStore } from '@/store/settingsStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { language } = useSettingsStore();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          tabBarLabel: t('home', language),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="time" size={size} color={color} />,
          tabBarLabel: t('history', language),
        }}
      />
      <Tab.Screen
        name="Help"
        component={Help}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="help-circle" size={size} color={color} />,
          tabBarLabel: t('help', language),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
          tabBarLabel: t('settings', language),
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Result" component={Result} />
            <Stack.Screen name="Alert" component={Alert} />
            <Stack.Screen name="About" component={About} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

