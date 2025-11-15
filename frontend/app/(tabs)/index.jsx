import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CreatePost from '../components/createPost'
import Feeds from '../components/Feeds'

const HomeScreen = () => {

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView>
        <CreatePost />
        <Feeds />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen