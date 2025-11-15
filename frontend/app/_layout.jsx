import "../global.css"
import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <PostProvider>
        <Stack>
          <Stack.Screen name='(auth)' options={{headerShown: false}}/>
          <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
        </Stack>
      </PostProvider>
    </AuthProvider>
  )
}
