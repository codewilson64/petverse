import { Ionicons } from '@expo/vector-icons'
import { Redirect, Tabs } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '../context/AuthContext'

const DashboardLayout = () => {
  const insets = useSafeAreaInsets()
  const { user } = useAuth()

  if(!user) return <Redirect href="/(auth)"/>

  return (
      <Tabs 
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#181818',
            borderColor: 'rgba(75, 85, 99, 0.5)',
            height: 50 + insets.bottom,
            paddingTop: 7,
          }
        }}
      >
        <Tabs.Screen 
          name='index'
          options={{title: '', tabBarIcon: ({focused}) => (
            <Ionicons 
              size={24}
              name={focused ? 'home' : 'home-outline'}
              color={focused ? 'brown' : 'gray'}
            />
          )}}
        />
        <Tabs.Screen 
          name='search'
          options={{title: '', tabBarIcon: ({focused}) => (
            <Ionicons 
              size={24}
              name={focused ? 'search' : 'search-outline'}
              color={focused ? 'brown' : 'gray'}
            />
          )}}
        />
        <Tabs.Screen 
          name='notifications'
          options={{title: '', tabBarIcon: ({focused}) => (
            <Ionicons
              size={24}
              name={focused ? 'notifications' : 'notifications-outline'}
              color={focused ? 'brown' : 'gray'}
            />
          )}}
      />
        <Tabs.Screen 
          name='messages'
          options={{title: '', tabBarIcon: ({focused}) => (
            <Ionicons
              size={24}
              name={focused ? 'chatbubble' : 'chatbubble-outline'}
              color={focused ? 'brown' : 'gray'}
            />
          )}}
        />
        <Tabs.Screen 
          name='profile'
          options={{title: '', tabBarIcon: ({focused}) => (
            <Ionicons
              size={24}
              name={focused ? 'person' : 'person-outline'}
              color={focused ? 'brown' : 'gray'}
            />
          )}}
        />
      </Tabs>
  )
}

export default DashboardLayout