import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Modal, Alert } from 'react-native'
import Icons from 'react-native-vector-icons/AntDesign'
import { View as ViewAnimated } from 'react-native-animatable'
import useFetch from '../hooks/useFetch'
import Filter from '../components/Filter'

const Home = ({ navigation }) => {
  const { data = [], get } = useFetch()
  const [isModalVisible, setModalVisible] = useState(false)
  const [listOfCheckBox, setListOfCheckBox] = useState([])
  const [name, setName] = useState('')
  const [listOfPoke, setListOfPoke] = useState([])
  useEffect(() => {
    get('pokemon?limit=100&offset=200}')
    return () => {
    }
  }, [])

  useEffect(() => {
    const newListOfPoke = data?.results?.filter((e) => e.name?.includes(name.toLowerCase())) ?? []
    setListOfPoke(newListOfPoke)
    return () => {
    }
  }, [data, name])

  const Headers = () => (
    <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
      <TextInput
        onChangeText={e => setName(e)}
        value={name}
        onSubmitEditing={(e) => get(`pokemon/${name.toLowerCase()}`)}
        placeholder='Contoh: Pikachu...'
        style={{ height: 40, borderWidth: 1, paddingHorizontal: 5, flex: 1, marginRight: 10 }}
      />
      <Icons onPress={() => setModalVisible(true)} name='filter' size={28} />
    </View>
  )
  const ButtonCompere = () => (
    <ViewAnimated useNativeDriver animation='fadeInUp'>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Compare', { listOfCheckBox })} style={{ borderWidth: 1, padding: 5, alignItems: 'center', flex: 1 }}>
          <Text>{`Compare ${listOfCheckBox.length}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setListOfCheckBox([])} style={{ padding: 5, marginLeft: 5 }}>
          <Icons name='reload1' size={25} />
        </TouchableOpacity>
      </View>
    </ViewAnimated>)

  const ChangeCheckboxValue = (itemName) => {
    if (listOfCheckBox.includes(itemName)) setListOfCheckBox(listOfCheckBox.filter((e) => e !== itemName))
    else if (listOfCheckBox.length > 1) Alert.alert('Message', 'Max poke to compire is 2')
    else setListOfCheckBox([...listOfCheckBox, itemName])
  }

  return (
    <View testID='welcome' style={styles.container}>
      {Headers()}
      <FlatList
        data={listOfPoke}
        initialNumToRender={12}
        maxToRenderPerBatch={6}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <ViewAnimated delay={index / 90} useNativeDriver animation='fadeInUpBig' style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between', width: '50%' }}>
              <TouchableOpacity onPress={() => ChangeCheckboxValue(item.name)} style={{ height: 20, width: 20, borderWidth: 1, alignSelf: 'center', marginRight: 10, backgroundColor: listOfCheckBox.includes(item.name) ? 'red' : 'transparent' }} />
              <TouchableOpacity onPress={() => navigation.navigate('Details', { pokeName: item.name })} style={{ borderWidth: 1, padding: 10, alignItems: 'center', flex: 1 }}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            </ViewAnimated>
          )
        }}
        ListFooterComponent={() => null}
        keyExtractor={(item, index) => `product catalogue ${index}${item.name}`}
      />
      {listOfCheckBox.length > 1 && ButtonCompere()}
      <Modal
        animationType='slide'
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Filter setListOfPoke={setListOfPoke} setModalVisible={setModalVisible} setListOfCheckBox={setListOfCheckBox} setName={setName} />
      </Modal>
    </View>
  )
}
export default Home
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
