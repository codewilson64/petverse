import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from "expo-router";

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signup, loading, error } = useAuth();
  const router = useRouter();

  const handleSignup = async () => {
    const success = await signup(username, password);
    if (success) {
      router.replace("/(tabs)");
    } else {
      console.log("Sign up failed")
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-8 text-gray-800">Sign Up</Text>

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
        onPress={handleSignup}
        className="w-full bg-green-500 py-3 rounded-xl"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-lg font-semibold text-center">
            Sign Up
          </Text>
        )}
      </TouchableOpacity>

      {error && <Text className="text-red-500 mt-4">{error}</Text>}
    </View>
  )
}

export default SignupScreen