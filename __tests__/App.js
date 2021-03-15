import 'react-native'
import React from 'react'
import App from '../App'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react-native'
jest.useFakeTimers()
jest.mock('react-native-vector-icons/AntDesign', () => 'Icon')

it('renders correctly', () => {
  renderer.create(<App />)
})

it('Testing search pokemon', () => {
  const r = render(<App />)
  const textInput = r.getByTestId('searchPoke')
  const createdItemText = 'pikachu'
  fireEvent.changeText(textInput, createdItemText)
})

it('Testing filter by Type', () => {
  const r = render(<App />)
  const filterIcons = r.getByTestId('filterIcons')
  fireEvent.press(filterIcons)
  const filterBack = r.getByTestId('modalBack')
  fireEvent.press(filterBack)
})
