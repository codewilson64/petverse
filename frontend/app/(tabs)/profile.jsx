import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../context/AuthContext'

const profile = () => {
  const { logout, loading } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={handleLogout}
        className="w-full bg-green-500 py-3 rounded-xl"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ): (
          <Text className="text-white text-lg font-semibold text-center">
            Log out
          </Text>
         )}
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default profile