import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddPost from '../components/AddPost'
import Feeds from '../components/Feeds'

const HomeScreen = () => {

  return (
    <SafeAreaView className='flex-1' edges={["top"]}>
      <View className='flex-1'>
        <AddPost />
        <Feeds />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen