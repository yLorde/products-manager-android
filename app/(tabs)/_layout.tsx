import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Página Inicial',
          animation: 'fade',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="meusProdutos"
        options={{
          title: 'Meus Produtos',
          animation: 'fade',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name='folder' color={color} />,
        }}
      />

      <Tabs.Screen
        name="adicionarProduto"
        options={{
          title: 'Adicionar Produto',
          animation: 'fade',
          href: {
            pathname: '/(tabs)/adicionarProduto',
          },
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="barcode" color={color} />,
        }}
      />


      <Tabs.Screen
        name="escanearUsandoCamera"
        options={{
          title: 'Scanner',
          animation: 'fade',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="camera" color={color} />,
        }}
      />

      <Tabs.Screen
        name="produtosVencidos"
        options={{
          title: 'Vencidos',
          animation: 'fade',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="clock" color={color} />,
        }}
      />

      <Tabs.Screen
        name="buscarProduto"
        options={{
          title: 'Buscar Produto',
          animation: 'fade',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name='film.fill' color={color} />,
        }}
      />

      <Tabs.Screen
        name="bancoDeDados"
        options={{
          title: 'Banco De Dados',
          animation: 'fade',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="internaldrive" color={color} />,
        }}
      />

    </Tabs>
  );
}
