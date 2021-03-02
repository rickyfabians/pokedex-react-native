import React from 'react'
import { View, Text } from 'react-native'

export const List = ({ name = '', value = '' }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
    <Text>{name}</Text>
    <Text>{value}</Text>
  </View>
)

export default { List }
