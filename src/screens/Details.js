import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import useFetch from '../hooks/useFetch'
import { List } from '../uikit'

const Details = ({ route }) => {
  const pokeName = route?.params?.pokeName ?? ''
  const { data = {}, fetching, get } = useFetch()
  useEffect(() => {
    get(`pokemon/${pokeName}`)
    return () => {

    }
  }, [])
  if (fetching) return <ActivityIndicator style={{ alignSelf: 'center', height: '100%' }} size='large' color='red' />
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={styles.card}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Profile</Text>
        <List name='name' value={data?.name} />
        <List name='height' value={data?.height} />
        <List name='weight' value={data?.weight} />
        <List name='base experience' value={data?.base_experience} />
      </View>
      <View style={styles.card}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Types</Text>
        {data?.types.map((e, index) => <List key={index} name={`slot ${e.slot}`} value={e.type?.name} />)}
      </View>
      <View style={styles.card}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Stats</Text>
        {data?.stats.map((e, index) => <List key={index} name={e.stat?.name ?? ''} value={e.base_stat} />)}
      </View>
    </View>
  )
}

export default Details

const styles = StyleSheet.create({
  card: {
    margin: 5,
    backgroundColor: '#ffff',
    padding: 10,
    borderRadius: 10
  }
})
