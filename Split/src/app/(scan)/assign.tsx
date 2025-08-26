import { useRouter } from 'expo-router';
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const assign = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
        <Text>Hello</Text>
        <TouchableOpacity onPress={() => router.push('/assign')}>
                <Text>Next</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default assign
