import { useReducer } from 'react'
import axios from 'axios'

const BaseUrl = 'https://pokeapi.co/api/v2/'
const reducer = (state, action) => {
  switch (action.type) {
    case 'request':
      return {
        ...state,
        fetching: true,
        error: null,
        data: null
      }
    case 'success':
      return {
        ...state,
        fetching: false,
        data: action.data,
        error: null
      }
    case 'failure':
      return {
        ...state,
        fetching: false,
        data: null,
        error: action.error
      }
    default: return state
  }
}

const initialData = {
  fetching: false,
  error: null,
  data: null
}

const useFetch = () => {
  const [state, dispatch] = useReducer(reducer, initialData)

  const get = async (param, callBack) => {
    let response = {}
    try {
      dispatch({ type: 'request' })
      console.log(`${BaseUrl}${param}`)
      const res = await axios.get(`${BaseUrl}${param}`)
      console.log({ res })
      response = res
      await resolved(res)
    } catch (error) {
      dispatch({ type: 'failure', error: 'Terjadi Kesalahan Koneksi' })
    } finally {
      if (callBack) callBack(response)
    }
    return response
  }

  const resolved = (res) => {
    if (res.status === 200) {
      if (!res.data.error) {
        dispatch({ type: 'success', data: res?.data ?? null })
      } else dispatch({ type: 'failure', error: res.data.message })
    } else dispatch({ type: 'failure', error: 'Terjadi Kesalahan Koneksi' })
  }

  return { ...state, get }
}

export default useFetch
