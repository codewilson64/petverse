import { View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePosts } from "../context/PostContext";

export default function Feeds() {
  const { posts, loading } = usePosts()

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">No posts yet 📭</Text>
      </View>
    );
  }

   return (
    <FlatList
      data={posts}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <View className="mb-5">
          
          {/* USER HEADER */}
          <View className="p-4 flex-row items-center gap-3">
            <Image
              source={{ uri: item.user?.avatar || "https://i.pravatar.cc/100" }}
              className="w-10 h-10 rounded-full"
            />

            <View>
              <Text className="font-semibold">{item.user?.username || "Unknown"}</Text>
              <Text className="text-gray-500 text-xs">Just now</Text>
            </View>
          </View>

          {/* CONTENT */}
          {item.content ? (
            <Text className="px-4 pb-3 text-base">{item.content}</Text>
          ) : null}

          {/* IMAGE (optional) */}
          {item.image ? (
            <Image source={{ uri: item.image }} className="w-full h-64" resizeMode="cover" />
          ) : null}

          {/* ACTIONS */}
          <View className="flex-row items-center justify-between px-4 mt-3">
            <View className="flex-row items-center gap-6">
              <TouchableOpacity className="flex-row items-center gap-1">
                <Ionicons name="heart-outline" size={22} />
                <Text>{item.likes || 0}</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center gap-1">
                <Ionicons name="chatbubble-outline" size={20} />
                <Text>{item.comments?.length || 0}</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Ionicons name="share-outline" size={20} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}
