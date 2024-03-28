import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';


const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text>
          HomeScreen
        </Text>
      </View>
    </SafeAreaView>
  );
}



export default HomeScreen
