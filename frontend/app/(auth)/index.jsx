import { Link, Redirect } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { user } = useAuth()

  if(user) return <Redirect href="/(tabs)" />

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-bold text-blue-500 mb-8">
        Welcome to Pet Verse!
      </Text>

      {/* Sign Up Button */}
      <Link href="/signup" asChild>
        <TouchableOpacity className="w-full bg-green-500 py-3 rounded-xl">
          <Text className="text-white text-lg font-semibold text-center">
            Sign Up
          </Text>
        </TouchableOpacity>
      </Link>

      {/* Login Button */}
      <Link href="/login" asChild>
        <TouchableOpacity className="w-full bg-blue-500 py-3 rounded-xl">
          <Text className="text-white text-lg font-semibold text-center">
            Log In
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
