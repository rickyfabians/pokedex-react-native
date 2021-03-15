import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native'
import Icons from 'react-native-vector-icons/AntDesign'
import { View as ViewAnimated } from 'react-native-animatable'
import useFetch from '../hooks/useFetch'

const Filter = ({ setModalVisible, setListOfPoke, setListOfCheckBox, setName }) => {
  const { fetching: fetchingType, data: dataType, get: getType } = useFetch()
  const { fetching: fetchingAbility, data: dataAbility, get: getAbility } = useFetch()
  const { get: FilterBy, fetching } = useFetch()
  useEffect(() => {
    getType('type')
    getAbility('ability')
    return () => {

    }
  }, [])
  const setFilter = (url) => {
    FilterBy(url, ({ data }) => {
      const pokemon = data?.pokemon?.reduce((result = [], value) => {
        result.push(value.pokemon)
        return result
      }, [])
      setListOfPoke(pokemon)
      setListOfCheckBox([])
      setName('')
      setModalVisible(false)
    })
  }
  const ListOfAtribute = ({ listofatribute, param }) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {listofatribute?.results?.map((e, index) => (
        <ViewAnimated key={index} delay={index / 50} useNativeDriver animation='zoomIn'>
          <TouchableOpacity onPress={() => setFilter(`${param}/${e.name}`)} style={{ borderWidth: 1, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10, margin: 4 }}>
            <Text>{e.name}</Text>
          </TouchableOpacity>
        </ViewAnimated>))}
    </View>
  )
  if (fetching) return <ActivityIndicator style={{ alignSelf: 'center', height: '100%' }} size='large' color='red' />
  return (
    <SafeAreaView style={{ padding: 10 }}>
      <TouchableOpacity testID='modalBack' onPress={() => setModalVisible(false)} style={{ marginBottom: 30 }}>
        <Icons name='arrowleft' size={30} />
      </TouchableOpacity>
      <View>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Types</Text>
        {fetchingType
          ? <ActivityIndicator style={{ alignSelf: 'center', width: '100%' }} size='large' color='red' />
          : <ListOfAtribute listofatribute={dataType} param='type' />}
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Ability</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {fetchingAbility
            ? <ActivityIndicator style={{ alignSelf: 'center', width: '100%' }} size='large' color='red' />
            : <ListOfAtribute listofatribute={dataAbility} param='ability' />}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Filter
