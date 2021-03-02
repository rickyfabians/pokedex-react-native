import React, { useEffect, useMemo } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import useFetch from '../hooks/useFetch'

const preview = {
  name: 'VS',
  stats: [{ base_stat: 'Hp' }, { base_stat: 'attack' }, { base_stat: 'defense' }, { base_stat: 'special-attack' }, { base_stat: 'special-defense' }, { base_stat: 'speed' }]
}
const Compare = ({ route }) => {
  const listOfCheckBox = route?.params?.listOfCheckBox ?? []
  const { data: dataFirstPoke, fetching: fetchingFirstPoke, get: getFirstPoke } = useFetch()
  const { data: dataSecondPoke, fetching: fetchingSecondPoke, get: getSecondPoke } = useFetch()
  useEffect(() => {
    getFirstPoke(`pokemon/${listOfCheckBox[0]}`)
    getSecondPoke(`pokemon/${listOfCheckBox[1]}`)
    return () => {

    }
  }, [])
  const PokeView = ({ data: { name = '', stats = [] } }) => (
    <View style={{ minWidth: '33%', alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{name}</Text>
      {stats.map((item, index) => (<Text key={index} style={styles.TextStats}>{item.base_stat}</Text>))}
    </View>
  )
  const firstPokePower = useMemo(() => {
    return dataFirstPoke?.stats?.reduce((result = 0, value) => (result + value.base_stat), 0) ?? ''
  }, [dataFirstPoke])

  const secondPokePower = useMemo(() => {
    return dataSecondPoke?.stats?.reduce((result = 0, value) => (result + value.base_stat), 0) ?? ''
  }, [dataSecondPoke])

  const winOrLose = (home, away) => (home === away
    ? <Text style={[styles.TextStats, { color: 'blue' }]}>DRAW</Text>
    : home > away
      ? <Text style={[styles.TextStats, { color: 'green' }]}>WIN</Text>
      : home < away && <Text style={[styles.TextStats, { color: 'red' }]}>LOSE</Text>
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 }}>
        {fetchingFirstPoke
          ? <ActivityIndicator style={{ alignSelf: 'center', minWidth: '33%' }} color='red' size='large' />
          : <PokeView data={dataFirstPoke || {}} />}
        <PokeView data={preview} />
        {fetchingSecondPoke
          ? <ActivityIndicator style={{ alignSelf: 'center', minWidth: '33%' }} color='red' size='large' />
          : <PokeView data={dataSecondPoke || {}} />}
      </View>
      {(firstPokePower !== '' && secondPokePower !== '') &&
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
          <View>
            <Text style={styles.TextStats}>{firstPokePower}</Text>
            <Text style={styles.TextStats}>{winOrLose(firstPokePower, secondPokePower)}</Text>
          </View>
          <Text style={styles.TextStats}>Total Power</Text>
          <View>
            <Text style={styles.TextStats}>{secondPokePower}</Text>
            <Text style={styles.TextStats}>{winOrLose(secondPokePower, firstPokePower)}</Text>
          </View>
        </View>}
    </View>
  )
}

export default Compare

const styles = StyleSheet.create({
  TextStats: {
    minWidth: '33%',
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'center'
  }
})
