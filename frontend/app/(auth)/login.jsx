import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth()
  const router = useRouter()

  const handleLogin = async () => {
    const success = await login(username, password)
    if(success) {
      router.replace("/(tabs)")
    } else {
      console.log("Login failed")
    }
  }

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
          <Text className="text-3xl font-bold mb-8 text-gray-800">Log in</Text>
    
          <TextInput
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base text-gray-800"
            placeholder="Username"
            placeholderTextColor="#9ca3af"
            value={username}
            onChangeText={setUsername}
          />
    
          <TextInput
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base text-gray-800"
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
    
          <TouchableOpacity
            onPress={handleLogin}
            className="w-full bg-green-500 py-3 rounded-xl"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ): (
              <Text className="text-white text-lg font-semibold text-center">
                Log in
              </Text>
            )}
          </TouchableOpacity>

          {error && <Text className="text-red-500 mt-4">{error}</Text>}
        </View>
  )
}

export default LoginScreen
