import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CreatePost from '../components/createPost'


const HomeScreen = () => {

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView>
        <CreatePost />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen