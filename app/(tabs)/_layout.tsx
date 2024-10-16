import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIconIonicons, TabBarIconMaterialCommunityIcons } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="(anime)"
        options={{
          title: 'Anime',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconIonicons name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(character)"
        options={{
          title: 'Characters',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconIonicons name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconMaterialCommunityIcons name={focused ? 'account-circle' : 'account-circle-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
