import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image, ActivityIndicator } from "react-native";
import { useCreatePost } from "../../hooks/useCreatePost";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreatePost() {
  const [content, setContent] = useState("")
  const [image, setImage] = useState(null)
  const { createPost, loading } = useCreatePost()
  const isDisabled = loading || (!content?.trim() && !image)

  const handlePost = async () => {
    const formData = new FormData();

    if (content) formData.append("content", content);

    if (image) {
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: `post-${Date.now()}.jpg`,
      });
    }

    await createPost(formData);
    setContent("");
    setImage(null);
  };


  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required to access gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
      {image && (
        <View className="relative w-full">
          <Image
            source={{ uri: image }}
            className="w-full h-52 rounded-lg"
            resizeMode="cover"
          />

          <TouchableOpacity
            onPress={() => setImage(null)}
            className="absolute top-2 right-2 bg-black/60 rounded-full p-1"
          >
          <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
