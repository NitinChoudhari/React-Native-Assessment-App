import React from 'react'
import { View, Text } from 'react-native'

 function HomeScreen({navigation}) {
    return (
        <View>
            <Text>HomePage</Text>
            <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <View style={STYLES.btnPrimary}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
    )
}
export default HomeScreen;
