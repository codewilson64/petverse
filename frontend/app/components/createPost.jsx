import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image, ActivityIndicator } from "react-native";
import { useCreatePost } from "../../hooks/useCreatePost";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const { createPost, loading } = useCreatePost()
  const isDisabled = loading || !content?.trim()

  const handlePost = async () => {
    await createPost(content)
    setContent("")
  };

  const pickImage = () => {
    console.log("Open image picker...");
    // Later integrate expo-image-picker here
  };

  return (
     <View className="p-4 gap-3">
      <View className="flex-row items-start gap-3">
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          className="w-10 h-10 rounded-full"
        />

        <TextInput
          className="flex-1 border border-gray-200 rounded-lg p-3 text-base"
          placeholder="What's on your mind?"
          multiline
          value={content}
          onChangeText={setContent}
        />
      </View>

      <View className="flex-row items-center justify-between">
        <TouchableOpacity 
          onPress={pickImage} 
          className="bg-gray-200 p-3 rounded-full"
        >
          <Ionicons name="image-outline" size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePost}
          className={`bg-blue-500 rounded-lg px-5 py-3 ${isDisabled ? "opacity-50" : ""}`}
          disabled={isDisabled}
        >
          {loading ? (
            <ActivityIndicator color="#fff"/>
          ): (
            <Text className="text-white font-semibold">Post</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
